import { io } from "./app";
import moment from "moment"
const BOT = "CHATBOT"

function formatMessage(username, text) {
  return {
    username,
    text,
    time : moment().format('h:mm a')
  }
}

io.on("connection", socket => {    
    socket.on("chatMessage", msg => {
        console.log(msg)
        io.emit("message", formatMessage("dms", msg))
    })

})


export default io;

/*
    socket.broadcast.emit("message", formatMessage(BOT,"00유저가 접속했습니다")) // 접속한 유저제외한 다른 유저
    
    socket.emit("message", formatMessage(BOT,"안녕하세요😀")); // 접속한 유저에게 인사
    
    socket.on("disconnect", ()=>{
      io.emit("message", formatMessage("USER", "00유저가 채팅을 떠났습니다.")) //모든 유저에게 
    })
*/


