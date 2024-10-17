import express from 'express'
import { addToCart,removeFromCart,getCart, addToCartBtn, getAddtoCartBtn } from '../controllers/cartControler.js'
import authMiddleware from '../middleware/auth.js';
 const cartRouter = express.Router();
 

 cartRouter.post("/add",authMiddleware, addToCart)
 cartRouter.post("/addBtn",authMiddleware,addToCartBtn)
 cartRouter.post("/remove", authMiddleware, removeFromCart);
 cartRouter.post('/get',authMiddleware, getCart)
 cartRouter.get('/list', getAddtoCartBtn)

 export default cartRouter;