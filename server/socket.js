import { sessionMiddleWare, expressServer } from "./app";
import sharedsession  from "express-socket.io-session";
import socketio from "socket.io";
import moment from "moment";
import Room from "./models/Room";
import Namespace from "./models/Namespace";
import Messages from "./models/Message";


// socket 서버
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
    // console.log(NAMESPACES)
    socket.emit('nsList',NAMESPACES);
  });
})


Namespace.find({}, function(err, namespaces) {
  namespaces.forEach((namespace)=>{
    // 세션정보 네임스페이스 에서 이용 하게하기
    io.of(namespace.endPoint).use(sharedsession(sessionMiddleWare));
  
    // 데이터 배열돌면서 네임스페이스  연결대기 시키기
    io.of(namespace.endPoint).on("connection", (nsSocket)=>{
      const user = nsSocket.handshake.session.passport.user;

      // 방 종류들 클라이언트에게 보내기
      nsSocket.emit('nsRoomLoad', namespace.rooms);
      
      // 방에 접속하면 문자 내역 전달하기
      nsSocket.on('joinRoom', (roomToJoin)=>{
        nsSocket.leave(Array.from(nsSocket.rooms)[1])
        nsSocket.join(roomToJoin)

        const roomName = Array.from(nsSocket.rooms)[1];
        if(roomName){
          Room.findOne({ "roomTitle" : roomName })
          .populate("history")
          .exec((err, data)=>{
            // console.log(data.history)
            nsSocket.emit('roomHistory', data.history )
          })
        }
      })
      
      // 메세지 주고 받기
      nsSocket.on('messageFromClient', async (msg) => {
        const roomName = Array.from(nsSocket.rooms)[1];

        const newMessage = await Messages.create({
          avatar : user.avataUrl || "/public/user_image.jpg",
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
    avatar : user.avataUrl || "/public/user_image.jpg"
  }
  return convertedMsg;
}

console.log("2번")