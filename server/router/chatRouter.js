import express from "express";
import namespaces from "../data/namespace";
import moment from "moment"
import { io } from "../app";

const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    // console.log(req.user)
    res.render("slack.pug", {name : req.user.name})
  
    // // 메인 네임스페이스에 연결되면 데이터들 불러오기
    // io.of("/").on("connection", (socket) => {    
    //   // console.log("main is connected")
    //   const nsData = namespaces.map((ns)=>{
    //     return {
    //         img: ns.img,
    //         endpoint: ns.endpoint
    //     }
    //   })
    //   socket.emit('nsList',nsData);
    // })
  
    // // 데이터 배열돌면서 네임스페이스  연결시키기
    // namespaces.forEach((namespace)=>{
    //   io.of(namespace.endpoint).on("connection", (nsSocket)=>{
    //     // console.log(`connected to the ${namespace.nsTitle}`)
    //     nsSocket.emit('nsRoomLoad', namespace.rooms);

    //     nsSocket.on('joinRoom',(roomToJoin)=>{
    //       // 방금 접속해있던 룸 나가기
    //       nsSocket.leave(Array.from(nsSocket.rooms)[1])
    //       // 새로운 룸 접속하기
    //       nsSocket.join(roomToJoin)
    //     })

    //     nsSocket.on('messageFromClient', (msg) => {
    //       const convertedMsg = {
    //         content : msg,
    //         time : moment().format('LLLL'),
    //         name : req.user.name,
    //         avatar : 'https://via.placeholder.com/30'
    //       }
          
    //       const roomName = Array.from(nsSocket.rooms)[1];

    //       console.log(`${roomName} 에게 ${convertedMsg.content} 보내기`)
    //       io.of(namespace.endpoint).to(roomName).emit('messageFromServer', convertedMsg);
        
    //     })

    //   })
    // })
})


export default chatRouter;