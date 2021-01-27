import mongoose  , { Schema } from "mongoose";

const roomSchema = new Schema({
    roomTitle : {
        type : String,
        required : true
    },
    namespace : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    privateRoom : {
        type : Boolean
    },
    history : {
        type : Array
    },
    users : [{
        type: mongoose.Types.ObjectId,
        ref : "user"
    }]
})

const model = mongoose.model("Room", roomSchema) 

export default model;