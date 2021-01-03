import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }
)

const db = mongoose.connection;

db.once("open", ()=>{
    console.log("DB IS CONNECTED ✔️")
})
db.on("error", ()=>{
    console.log("DB ERROR ⚠️")
})