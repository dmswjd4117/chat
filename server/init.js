



/*

import message from "./models/message";
import User from "./models/User";
import chatRoom from "./models/ChatRoom";


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

