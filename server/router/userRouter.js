import passport from "passport";
import express from "express";
import User from "../models/User";
import { localsMiddleware, accessPrivate, accessPublic } from "../middlewares";

const userRouter = express.Router();


userRouter.get("/login", accessPublic, (req, res)=>{
    res.render('login')
})

userRouter.post("/login", accessPublic, 
    passport.authenticate('local'),
        localsMiddleware,
        function(req, res) {
        res.redirect("/");
    }
)

userRouter.get("/register", accessPublic, (req, res)=>{
    res.render('register')
})

userRouter.post("/register", accessPublic, (req, res)=>{
    const { name, email, password, confirmPassword } = req.body;

    if(password != confirmPassword){
        res.status(400);
        return res.render('main' ,{ "message" : "비밀번호가 일치하지 않습니다"})
    }
    
    console.log(name,email )
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