import mongoose  , { Schema } from "mongoose";

const chatRoomSchema = new Schema({
    roomName : {
        type : String,
        required : true
    },
    users : [{
        type: mongoose.Types.ObjectId,
        ref : "user"
    }]
})

const model = mongoose.model("chatRoom", chatRoomSchema) 

export default model;