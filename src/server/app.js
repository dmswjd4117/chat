const PORT = process.env.PORT || 8080;
import "@babel/polyfill";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localsMiddleware  , accessPrivate  }  from "./middlewares";
import "./db";
import "./models/User";
import "./paassport";
import userRouter from "./router/userRouter";
import chatRouter from "./router/chatRouter";
import Room from "./models/Room";
import Namespace from "./models/Namespace";
import socketio from "socket.io";

dotenv.config();

// express 서버
const app = express();


// 세션
const mongoStore = MongoStore(session);
const sessionMiddleWare = session({
  secret: process.env.COOKIE_SECRET, 
  resave: true,
  saveUninitialized: false,
  store: new  mongoStore({ mongooseConnection: mongoose.connection })
  // 서버를 끄고 켜도 세션정보가 유지될수 있게 몽고디비에 세션정보들을 저장해준다.
});

app.use(sessionMiddleWare);

/*
브라우저에 서버세션에 접근할 수 있는 키(세션아이디)를 쿠키에 저장시킨다.
서버에서 세션을 통해 정보를 관리한다.
*/

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "../client"))

app.use(express.static(path.join(__dirname, "../client")));

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

app.get("/init", async(req, res)=>{
  console.log("초기화 완료")
  mongoose.connection.db.dropCollection('namespaces');
  mongoose.connection.db.dropCollection('rooms');
  mongoose.connection.db.dropCollection('messages');

  const catNs = await Namespace.create({
    img : "background2.jpg",
    nsTitle : "CAT",
    endPoint : "/cat"
  })

  const Linux = await Namespace.create({
    img : "background.jpg",
    nsTitle : "Linux",
    endPoint : "/linux"
  })

  const catPic = await Room.create({
    roomTitle : "picture",
 
  })

  
  const catTalk = await Room.create({
    roomTitle : "talk",
 
  })


  const redHat = await Room.create({
    roomTitle : "RED HAT",
 
  })

  catNs.rooms.push({ "roomTitle" : catPic.roomTitle , "roomID" : catPic._id});
  catNs.rooms.push({ "roomTitle" : catTalk.roomTitle , "roomID" : catTalk._id});
  catNs.save();

  Linux.rooms.push({ "roomTitle" : redHat.roomTitle , "roomID" : redHat._id});
  Linux.save();

  res.redirect("/chat");
})

// err
app.use((req, res, next)=>{
  res.status(404).send("NOT FOUND");
})


// app.listen()은 http.Server를 반환해준다.
const expressServer = app.listen(PORT, ()=>{
  console.log(`Example app listening at http://localhost:${PORT}`)
})

const io = socketio(expressServer);

 

export { sessionMiddleWare, expressServer, io }





// const { _id :  id, name } 
// = socket.handshake.session.passport.user;
// console.log(id, name)

/*
const app = require('express')()?
1) require('express')() express앱 객체를 생성한다.

2) """
  var express = require('express');
  var app     = express();
   """
  를 줄인거다
*/