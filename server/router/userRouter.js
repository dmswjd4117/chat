const express = require("express");
const userRouter = express.Router();


userRouter.get("/login", (req, res)=>{
    res.render('login')
})

userRouter.post("/login", (req, res)=>{
    //로그인처리
})


userRouter.get("/register", (req, res)=>{
    res.render('register')
})

userRouter.post("/register", (req, res)=>{
    //로그인처리
})


module.exports = userRouter;