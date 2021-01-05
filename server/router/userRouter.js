import passport from "passport";
import express from "express";
import User from "../models/User";
import { localsMiddleware } from "../middlewares";

const userRouter = express.Router();


userRouter.get("/login", (req, res)=>{
    res.render('login')
})

userRouter.post("/login",
    passport.authenticate('local'),
        localsMiddleware,
        function(req, res) {
        res.redirect("/");
    }
)


userRouter.get("/register", (req, res)=>{
    res.render('register')
})

userRouter.post("/register", (req, res)=>{
    const { name, email, password, confirmPassword } = req.body;

    if(password != confirmPassword){
        res.status(400);
        return res.render('register' ,{ "message" : "비밀번호가 일치하지 않습니다"})
    }

    User.find({ email }, async(err, user) => {
        if(user.length){
            console.log(user)
            res.status(400);
            return res.render('register' ,{ "message" : "이미 등록된 이메일입니다."})
        }
        try{
            const user = await User({
                name : name, 
                email : email
            })
            await User.register(user, password);
            res.redirect("/");
        }catch(err){
            console.log(err);
            res.redirect("/user/register")
        }
        
    })

})


module.exports = userRouter;