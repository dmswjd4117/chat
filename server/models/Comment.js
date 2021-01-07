import mongoose , { Schema }from "mongoose";

const Comment = new Schema({
    userID : {
        type:String,
        ref: "User"
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
const comment = mongoose.model("comment", Comment);

export default comment;