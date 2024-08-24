 import express from "express"
 import cors from "cors"
import { connectDb } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"




// app config
const app = express()
const port = 4000

// meddlewere
app.use(express.json())
app.use(cors())

// db connnection
connectDb();

// api endpoints
app.use("/api/food",foodRouter)
app.use('/images',express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{
    res.send("api is Working")
})
app.listen(port,()=>{
    console.log("server started http:///localhost:4000")
})

// mongodb+srv://r9ahim:<password>@cluster0.ixmoo.mongodb.net/?
