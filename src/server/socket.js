import { sessionMiddleWare, expressServer } from "./app";
import sharedsession  from "express-socket.io-session";
import { userInfo } from "./middlewares";
import socketio from "socket.io";
import moment from "moment";
import Room from "./models/Room";
import Namespace from "./models/Namespace";
import Messages from "./models/Message";
import User from "./models/User";  
 

const io = socketio(expressServer);

// 메인 네임스페이스에 연결되면 네임스페이스 종류 클라이언트에 보내기
io.of("/").on("connection", function(socket) {    
  const NAMESPACES = [];
  Namespace.find({}, function(err, names) {
    names.forEach((element)=>{
      let data = {
          img: element.img,
          endpoint: element.endPoint,
          nsTitle : element.nsTitle
      }
      NAMESPACES.push(data)
    })

    socket.emit('nsList',NAMESPACES);
  });

  socket.on('addNs', function(obj){
    const { nsName : nsTitle } = obj;

    const mainRoom = new Room({ roomTitle : 'main' });
    mainRoom.save((err, newRoom)=>{
      if(err) {
        console.log(err)
        return;
      }

      const newRoomObj = {roomTitle : 'main', roomID : newRoom._id};

      Namespace.create({
        nsTitle, 
        endPoint : `/${nsTitle}`,
        img : `background.jpg`,
        rooms : [newRoomObj]
      }).then(res=>{

        socket.emit('newNsLoad', { 
          nsTitle, 
          endPoint : `/${nsTitle}`,
          img : `background.jpg`
        })

        socket.emit('nsNewRoomLoad', newRoomObj);

      }).catch(err=>{
        console.log(err+'namespace create')
      })
    })
  })

})

// Room db 에서 rooms의 objectID를 이용해 정보 가져오기
const getRoomInfo = (room) =>{
  return new Promise((resolve, reject)=>{
    Room.findById(room.roomID, (err, data)=>{
      if(err){
        return reject(err)
      }
      resolve(data);
    })
  })
}

 
Namespace.find({}, (err, namespaces) => {
  namespaces.forEach((namespace)=>{
    // 세션정보 네임스페이스 에서 이용 하게하기
    io.of(namespace.endPoint).use(sharedsession(sessionMiddleWare));

    // 데이터 배열돌면서 네임스페이스  연결대기 시키기
    io.of(namespace.endPoint).on("connection", async(nsSocket)=>{
      const id = nsSocket.handshake.session.passport.user._id;
      let user = "";
      await User.findById(id, (err, res)=>{
        user = res;
      }) 

      // // 방 종류들 클라이언트에게 보내기
      Namespace.find({_id : namespace._id }, (err , space)=>{
        if(!space[0]){
          return;
        }
 
        const rooms = space[0].rooms;
        const res = [];
        
        rooms.map(room=>{
          res.push(
            new Promise(resolve=>{
              getRoomInfo(room)
              .then(roomInfo=>{
                resolve(roomInfo);
              })
            })
          )
        })

        Promise.all(res)
        .then(data=>{
          nsSocket.emit('nsRoomLoad', data);
        })
        .catch(err=>{
          console.err(err)
        })
      }) 
      

      nsSocket.on('addRoom', (object)=>{
        const { roomTitle, namespace : nsTitle } = object
          Room.create({
            roomTitle,
          }, (err, room)=>{
            if(err) return  res.json({ success : false})
    
            const newRoom = { roomTitle, roomID : room._id}
    
            Namespace.findOneAndUpdate(
                {nsTitle : nsTitle}, 
                { $push : { rooms : newRoom}},
                { new : true, upsert : true},
                (err, doc, res)=>{
                    // console.log(err, doc, res)
                }
            )
    
            console.log(nsTitle+'에 '+roomTitle+'방 추가')
            nsSocket.emit('nsNewRoomLoad', newRoom);
        })
      })
      
      // 방에 접속하면 문자 내역 전달하기
      nsSocket.on('joinRoom', (roomToJoin)=>{
        nsSocket.leave(Array.from(nsSocket.rooms)[1])
        nsSocket.join(roomToJoin)

        const roomName = Array.from(nsSocket.rooms)[1];
        if(roomName){
          Room.findOne({ "roomTitle" : roomName })
          .populate("history")
          .exec(async(err, data)=>{
            if(err){
              console.error(err+"!");
              return 
            } 
            if(data){
              nsSocket.emit('roomHistory',  data.history)
            }
          })
        }
      })

      // 메세지 주고 받기
      nsSocket.on('messageFromClient', async (msg) => {
        const roomName = Array.from(nsSocket.rooms)[1];

        const newMessage = await Messages.create({
          avatar : user.avataUrl,
          userID : user._id,
          name : user.name,
          content : msg,
        })

        Room.findOne({ "roomTitle" : roomName }, (err, roomname)=>{
          roomname.history.addToSet(newMessage._id);
          roomname.save();
        })

        const convertedMsg = formatMsg({ id : newMessage._id, msg, user});
      
        console.log(`${roomName} 에게 ${convertedMsg.content} 보내기`)
        io.of(namespace.endPoint).to(roomName).emit('messageFromServer', convertedMsg);
      })
    })
  })
});



function formatMsg({id, msg, user}) {
  const convertedMsg = {
    id : id, 
    content : msg,
    time : moment().format('LLLL'),
    name : user.name,
    avatar : user.avataUrl || "/image/user_image.jpg"
  }
  return convertedMsg;
}


 