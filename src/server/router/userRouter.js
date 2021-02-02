import passport from "passport";
import express from "express";
import User from "../models/User";
import upload from "../helpers";

import { localsMiddleware, accessPrivate, accessPublic ,userInfo } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/info", accessPrivate, userInfo, (req, res)=>{
    const { avataUrl, email, name} = req.userInfo
    res.render('userDetail' , { respond : {avataUrl, email, name} })
})

userRouter.post("/img/upload", accessPrivate, (req, res)=>{
    upload(req, res, async(err)=>{
        if(err){
            console.log(err)
            return res.redirect('/user/info')
        }
        const location = req.file.location;
        if(location){
            await User.findOneAndUpdate({ _id : req.user._id}, { avataUrl : location});
            res.redirect('/user/info')
        }
    })
})

userRouter.post("/password/change", accessPrivate, (req, res)=>{
    const { password , newpassword, confirmPassword} = req.body;
    User.findById(req.user._id, (err, res)=>{
        console.log(res)
    })
})



userRouter.post("/login", accessPublic, 
    passport.authenticate('local'),
        localsMiddleware,
        function(req, res) {
        res.redirect("/");
    }
)

userRouter.post("/register", accessPublic, (req, res)=>{
    const { name, email, password, confirmPassword } = req.body;

    
    if(password != confirmPassword){
        return  res.redirect("/")
    }
    
    console.log(name,email )
    User.find({ email }, async(err, user) => {
        if(user.length){
            console.log(user)
            res.status(400);
            return  res.redirect("/")
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

userRouter.get("/git/login", passport.authenticate("github"))

userRouter.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

userRouter.get("/logout", accessPrivate,  (req,res)=>{
    req.logout();
    console.log("???")
    return res.status(400).redirect("/");
})

userRouter.get("/auth", (req, res)=>{
    if(req.user){
        return res.json({ login : true })
    }
    return res.json({ login : false })
})

module.exports = userRouter;