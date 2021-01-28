import express from "express";
import namespaces from "../data/namespace";
import moment from "moment"
import { io } from "../app";
import Room from "../models/Room";
import Namespace from "../models/Namespace";

const chatRouter = express.Router();

chatRouter.get("/", (req, res)=>{
    // Namespace.find({}, function(err, res) {
    //     nsData = res.map((ns)=>{
    //       return {
    //           img: ns.img,
    //           endpoint: ns.endpoint
    //       }
    //     })
    // })
    res.render("slack.pug", {name : req.user.name})
})


export default chatRouter;