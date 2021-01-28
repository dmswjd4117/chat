import { sessionMiddleWare, expressServer } from "./app";
import sharedsession  from "express-socket.io-session";
import socketio from "socket.io";
import namespaces from "./data/namespace";
import moment from "moment";
import Room from "./models/Room";
import Namespace from "./models/Namespace";
import Messages from "./models/Message";


// socket 서버
const io = socketio(expressServer);


// // 메인 네임스페이스에 연결되면 데이터들 불러오기
io.of("/").on("connection", function(socket) {    
  const NAMESPACES = [];
  Namespace.find({}, function(err, names) {
    names.forEach((element)=>{
      let data = {
          img: element.img,
          endpoint: element.endPoint
      }
      NAMESPACES.push(data)
    })
    // console.log(NAMESPACES)
    socket.emit('nsList',NAMESPACES);
  });
})


namespaces.forEach((namespace)=>{
  // 세션정보 네임스페이스 에서 이용 하게하기
  io.of(namespace.endpoint).use(sharedsession(sessionMiddleWare));

  // 데이터 배열돌면서 네임스페이스  연결시키기
  io.of(namespace.endpoint).on("connection", (nsSocket)=>{

    const user = nsSocket.handshake.session.passport.user;

    nsSocket.emit('nsRoomLoad', namespace.rooms);

    nsSocket.on('joinRoom',(roomToJoin)=>{
      // 방금 접속해있던 룸 나가기
      nsSocket.leave(Array.from(nsSocket.rooms)[1])
      // 새로운 룸 접속하기
      nsSocket.join(roomToJoin)

      const roomHistory = Array.from(namespace.rooms).find((elem)=>{
        return elem.roomTitle === roomToJoin;
      })
      if(roomHistory)  nsSocket.emit('roomHistory', roomHistory.history )
    })


    nsSocket.on('messageFromClient', async (msg) => {
      const newMessage = await Messages.create({
        content : msg,
        userID : user._id
      }) 

      const convertedMsg = formatMsg({ id : newMessage._id, msg, user});
      
      const roomName = Array.from(nsSocket.rooms)[1];
      const roomHistory = Array.from(namespace.rooms).find((elem)=>{
        return elem.roomTitle === roomName;
      })

      roomHistory.history.push(convertedMsg);
      console.log(`${roomName} 에게 ${convertedMsg.content} 보내기`)
      io.of(namespace.endpoint).to(roomName).emit('messageFromServer', convertedMsg);
    })

  })
})
  


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