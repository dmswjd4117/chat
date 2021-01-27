const PORT = process.env.PORT || 8080;
import namespaces from "./data/namespace";
import moment from "moment"
import socketio from "socket.io";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localsMiddleware  , accessPrivate }  from "./middlewares";
import "./db";
import "./models/User";
import "./paassport";
import userRouter from "./router/userRouter";
import chatRouter from "./router/chatRouter";

dotenv.config();

// express 서버
const app = express();
const expressServer = app.listen(PORT, ()=>{
  console.log(`Example app listening at http://localhost:${PORT}`)
})// app.listen()은 http.Server를 반환해준다.

// socket 서버
const io = socketio(expressServer);


// 세션
const mongoStore = MongoStore(session);
app.use(
  session({
    secret: process.env.COOKIE_SECRET, 
    resave: true,
    saveUninitialized: false,
    store: new  mongoStore({ mongooseConnection: mongoose.connection })
    // 서버를 끄고 켜도 세션정보가 유지될수 있게 몽고디비에 세션정보들을 저장해준다.
  })
);

/*
브라우저에 서버세션에 접근할 수 있는 키(세션아이디)를 쿠키에 저장시킨다.
서버에서 세션을 통해 정보를 관리한다.
*/

app.set('view engine', 'pug')
app.set('views', 'client')

app.use('/public', express.static('client/image')); 
app.use('/public', express.static('client//css'));
app.use('/public', express.static('client/js'));

app.use(morgan("dev"));
app.use(bodyParser.json()); //json으로 온 요청을 해석
app.use(bodyParser.urlencoded({ extended: true })); // 폼으로 온 요청을 해석
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);


app.get("/", async(req,res)=>{
    res.render("main.pug")
})

app.use("/user", userRouter)

app.use("/chat", accessPrivate, chatRouter)


// err
app.use((req, res, next)=>{
  res.status(404).send("NOT FOUND");
})


// 메인 네임스페이스에 연결되면 데이터들 불러오기
io.of("/").on("connection", (socket) => {    
  // console.log("main is connected")
  const nsData = namespaces.map((ns)=>{
    return {
        img: ns.img,
        endpoint: ns.endpoint
    }
  })
  socket.emit('nsList',nsData);
})

// 데이터 배열돌면서 네임스페이스  연결시키기
namespaces.forEach((namespace)=>{
  io.of(namespace.endpoint).on("connection", (nsSocket)=>{
    // console.log(`connected to the ${namespace.nsTitle}`)
    nsSocket.emit('nsRoomLoad', namespace.rooms);


    nsSocket.on('joinRoom',(roomToJoin)=>{
      // 방금 접속해있던 룸 나가기
      nsSocket.leave(Array.from(nsSocket.rooms)[1])
      // 새로운 룸 접속하기
      nsSocket.join(roomToJoin)

      const roomHistory = Array.from(namespace.rooms).find((elem)=>{
        return elem.roomTitle === roomToJoin;
      })

      nsSocket.emit('roomHistory', roomHistory.history )
    })

    nsSocket.on('messageFromClient', (msg) => {
      const convertedMsg = {
        content : msg,
        time : moment().format('LLLL'),
        name : "asd",
        avatar : 'https://via.placeholder.com/30'
      }
      
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
  
export {io};








/*
const app = require('express')()?
1) require('express')() express앱 객체를 생성한다.

2) """
  var express = require('express');
  var app     = express();
   """
  를 줄인거다
*/