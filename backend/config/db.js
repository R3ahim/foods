import mongoose from "mongoose";

 export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://r9ahim:MtaLRPuZHnkiqvDD@cluster0.ixmoo.mongodb.net/food').then(()=>console.log("database connected"));

}

