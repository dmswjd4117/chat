import { server } from "./app";
import "./socket"
import Comment from "./models/Comment";
import User from "./models/User";

/*
const user = new User({
  name: "google",
  email : "ASD@ASD.ASD"
})

user.save((err)=>{
  if(err) return 
  const comment = new Comment({
    userID : user._id,
    content : "GOOD"
  })
  comment.save();
  Comment.findOne({content: "GOOD"})
  .populate("userID") // populate
  .exec((err,data)=>{ 
    console.log('2 : '+ data)
  })
})
*/

const PORT = process.env.PORT || 8080;

server.listen(PORT, ()=>{
  console.log(`Example app listening at http://localhost:${PORT}`)
})

