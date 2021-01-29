import mongoose , { mongo, Schema }from "mongoose";

const messageSchema = new Schema({
    //https://catnap-jo.tistory.com/19
    avatar : {
        type : String
    },
    userID : {
        type : mongoose.Types.ObjectId,
        ref : "user"
    },
    name : {
        type : String
    },
    content : {
        type : String,
    },
    time : {
        type: Date,
        default : Date.now
    },
})

                            //모델 이름  // 스키마
const model = mongoose.model("message", messageSchema);

export default model;


// chatRoom : {
//     type : mongoose.Types.ObjectId,
//     ref : "chatroom"
// }