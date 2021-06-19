import express from "express";
import Namespace from "../models/Namespace";
import Room from "../models/Room";
import socketio from "socket.io";
import { expressServer, io } from "../app";
  
const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    res.render("slack.pug", {name : req.user.name})
})


chatRouter.post("/addNamespace", (req, res)=>{
    const name = req.body.name;
    Namespace.create({
        nsTitle : name,
        endPoint : `/${name}`,
        img : "background3.jpg"
    })
    return res.redirect("/chat");
})



export default chatRouter;

//database >> collection >> document
// https://docs.mongodb.com/manual/reference/operator/update/positional/#update-documents-in-an-array
// https://stackoverflow.com/questions/41915325/mongoose-how-can-i-findoneandupdate-on-an-array-property-and-push-into-that-fou