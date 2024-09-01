import express from "express"
import { addFood, foodDetails, listFood, removeFood } from "../controllers/foodControler.js"
import multer from "multer"


const foodRouter = express.Router();

// image storegae engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.get("/fooddetails/:id",foodDetails)
foodRouter.post("/remove",removeFood)



export default foodRouter;
