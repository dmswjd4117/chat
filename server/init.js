import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import "./db";

dotenv.config();

const app = express();


app.use(morgan("dev"));

app.set('view engine', 'pug')
app.set('views', 'client')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static('client/image'));
app.use('/public', express.static('client/css'));
app.use('/public', express.static('client/js'));


const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Example app listening at http://localhost:${PORT}`)
})

module.exports = { app : app, PORT : PORT }

/*
브라우저에 서버세션에 접근할 수 있는 키를 쿠키에 저장시킨다.
서버에서 세션을 통해 정보를 관리한다.
*/



