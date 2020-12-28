const express = require("express");
const { app } = require("../init");
const userRouter = express.Router();

userRouter.post("/add", (req,res)=>{
    const { name , link } = req.body
})


module.exports = userRouter;