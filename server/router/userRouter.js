import passport from "passport";
import express from "express";
import User from "../models/User";
import path from "path";
import multer from "multer";
import { fileFilter} from "../helpers";

import { localsMiddleware, accessPrivate, accessPublic ,userInfo } from "../middlewares";

const userRouter = express.Router();
const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename : function(req, file, cb) {
        // fieldname: 'profile_pic',
        // originalname: '6.jpeg',
        // encoding: '7bit',
        // mimetype: 'image/jpeg'
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage , fileFilter}).single('profile_pic');

userRouter.get("/info", accessPrivate, userInfo, (req, res)=>{
    const { avataUrl, email, name} = req.userInfo
    res.render('userDetail' , { respond : {avataUrl, email, name} })
})

userRouter.post("/img/upload", accessPrivate, (req, res)=>{
    upload(req, res, async(err)=>{
        if(err){
            return res.staus(400).render('userDetail', {err : err})
        }
        if(req.file){
            await User.findOneAndUpdate({ _id : req.user._id}, { avataUrl : req.file.path});
            res.redirect('/user/info')
        }
    })
})


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