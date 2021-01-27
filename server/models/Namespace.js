import mongoose  , { Schema } from "mongoose";

const namespaceSchema = new Schema({
    img : {
        type : String,
    },
    nsTitle : {
        type : String,
        required : true
    },
    rooms : {
        type : Array
    },
    endPoint : {
        type : String,
        required : true
    },
    users : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    }
})

const model = mongoose.model("Namespace", namespaceSchema) 

export default model;