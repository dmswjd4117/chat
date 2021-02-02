import express from "express";

const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    res.render("slack.pug", {name : req.user.name})
})

export default chatRouter;