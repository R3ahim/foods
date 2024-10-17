import express from 'express'
import { listUser, loginUser,registerUser, removeUser } from '../controllers/userController.js'


const userRouter = express.Router()

userRouter.post("/register",registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/users',listUser)
userRouter.post("/remove",removeUser)


export default userRouter;
