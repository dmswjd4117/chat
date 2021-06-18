import express from "express";
import Namespace from "../models/Namespace";
import Room from "../models/Room";
import socketio from "socket.io";
import { expressServer } from "../app";
// import { io } from "../socket";

  
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
})


chatRouter.post("/addRoom", (req, res)=>{
    const { roomTitle, namespace : nsTitle } = req.body

    Room.create({
        roomTitle,
    }, (err, room)=>{
        if(err) return  res.json({ success : false})

        const newRoom = { roomTitle, roomID : room._id}

        Namespace.findOneAndUpdate(
            {nsTitle : nsTitle}, 
            { $push : { rooms : newRoom}},
            { new : true, upsert : true},
            (err, doc, res)=>{
                // console.log(err, doc, res)
            }
        )
 
        // io.of(`/${nsTitle}`).on("connection", (nssocket)=>{
        //     console.log(">")
        //     nssocket.emit('nsRoomLoad', newRoom);
        // })

        // initSocket()
    })

})


export default chatRouter;

//database >> collection >> document
// https://docs.mongodb.com/manual/reference/operator/update/positional/#update-documents-in-an-array
// https://stackoverflow.com/questions/41915325/mongoose-how-can-i-findoneandupdate-on-an-array-property-and-push-into-that-fou