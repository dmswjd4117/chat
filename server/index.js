const { app } = require("./init");
const path = require("path");
const userRouter = require("./router/userRouter");
const shortRouter = require("./router/shortRouter");
const io = require('socket.io');


app.get("/", async(req,res)=>{
    res.render("main.pug")
    //res.sendFile(path.join(process.cwd()+ "/client/main.html"))
})

app.use("/shortcut", shortRouter);
app.use("/user", userRouter)


// err
app.use((req, res, next)=>{
    res.status(404).send("NOT FOUND");
})
