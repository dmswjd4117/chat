import express from "express";
import namespaces from "../data/namespace";
import moment from "moment"
import { io } from "../app";

const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    res.render("slack.pug", {name : req.user.name})
})


export default chatRouter;