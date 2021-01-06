import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { localsMiddleware }  from "./middlewares";
import "./db";
import "./models/User";
import "./paassport";

dotenv.config();

const app = express();

const mongoStore = MongoStore(session);

app.set('view engine', 'pug')
app.set('views', 'client')

app.use('/public', express.static('client/image'));
app.use('/public', express.static('client/css'));
app.use('/public', express.static('client/js'));

app.use(morgan("dev"));
app.use(bodyParser.json()); //json으로 온 요청을 해석
app.use(bodyParser.urlencoded({ extended: true })); // 폼으로 온 요청을 해석
app.use(cookieParser(process.env.COOKIE_SECRET))

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

app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);



const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})

module.exports = { app : app, PORT : PORT }







/*
app.get("/cookie", (req, res)=>{
  console.log(req.cookies);
  res.cookie("zas", "zs", {
    secure : false,
    httpOnly : true
  });
  res.end();
})
*/



