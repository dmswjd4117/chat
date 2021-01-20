import mongoose from "mongoose";
import passportLocalMongoose  from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    avataUrl : String,
    githubId : Number,
    chatRooms : {
        type : String,
        ref : "chatroom"
    },
    chats : [{
        type : String,
        ref : "message"
    }]
});

UserSchema.plugin(passportLocalMongoose, {usernameField : "email"})

const model = mongoose.model("user", UserSchema);

export default model;
