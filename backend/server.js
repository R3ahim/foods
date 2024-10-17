 import express from "express"
 import cors from "cors"
 import { createServer } from "http"; // To create an HTTP server
 import { Server as socketIo } from "socket.io"; // Import Socket.io
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

// Create an HTTP server and pass the Express app to it
const server = createServer(app);

// Initialize Socket.io with the HTTP server
const io = new socketIo(server, {
  cors: {
    origin: "*", // Allow all origins for development, adjust for production
  },
});

// Handle socket connection
io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  // You can add more socket event listeners if needed

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

// Export io to use it in the order controller
export { io };