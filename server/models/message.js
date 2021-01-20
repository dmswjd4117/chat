import mongoose , { mongo, Schema }from "mongoose";

const messageSchema = new Schema({
    userID : {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    chatRoom : {
        type : mongoose.Types.ObjectId,
        ref : "chatroom"
    },
    //https://catnap-jo.tistory.com/19
    content : {
        type : String,
        required : true
    },
    date : {
        type: Date,
        default : Date.now
    }
})
                            // 모델 이름  // 스키마
const model = mongoose.model("message", messageSchema);

export default model;