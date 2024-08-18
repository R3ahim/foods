 import express from "express"
 import cors from "cors"





// app config
const app = express()
const port = 4000

// meddlewere
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("api is Working")
})
app.listen(port,()=>{
    console.log("server started http:///localhost:4000")
})