const { app } = require("./init");
const path = require("path");
const userRouter = require("./router/userRouter");
const shortRouter = require("./router/shortRouter");
const io = require('socket.io');

const sessions = {};

app.get("/", async(req,res)=>{
    if(req.headers.cookie){
        let cookie = req.headers.cookie
        .split(';')
        .map(v => v.split('='))
        .map(v=>console.log(v))
        //console.log(cookie)
    }
    res.sendFile(path.join(process.cwd()+ "/client/main.html"))
})
 
app.use("/user", userRouter)
app.use("/shortcut", shortRouter);
