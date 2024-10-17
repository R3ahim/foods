import userModel from '../models/userModel.js'
import cartModel from '../models/cartModel.js';


// add items to user cart
const addToCart = async (req,res) =>{
  try {
    let userData = await userModel.findById(req.body.userId);
     let cartData = await userData.cartData ;
     if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] =1
     }
     else{
        cartData[req.body.itemId] +=1;
     }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"added to cart"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }
}
const addToCartBtn  = async (req,res)=>{
  const data = req.body;
  const email = data.email;
  const itemId = data.itemId;

  
  
  const user = await cartModel.findOne({ email });
  const user1 = await cartModel.findOne({ itemId });

  try {
    if( !user1){
      const cart = new cartModel(data)
      await cart.save();
    res.json({success:true,message:"cart is added"})
    }
    else {
      // If the user exists, update the item in the cart
      const updatedCart = await cartModel.findOneAndUpdate(
        { itemId }, // Filter to find the item by itemId
        data,       // Data to update the item with
        { new: true } // Options: return the updated document
      );
      if (updatedCart) {
        res.json({ success: true, message: "Added to cart" });
      } else {
        res.json({ success: false, message: "Item not found to update" });
      }
    }
} catch (error) {
    console.log(error)
    res.json({success:false,message:"somthing probelm here"})
}
  
}
const getAddtoCartBtn = async (req,res) =>{
  try {
     const foods = await cartModel.find({});
     res.json({succes:true,data:foods})
  } catch (error) {
     console.log(error);
     res.json({success:false,message:("Eroror")})
  }
}

// remove items from user cart
const removeFromCart = async(req,res) =>{
   try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -= 1;
        
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"removed from cart"})

   } catch (error) {
    console.log(error)
    res.json({success:false,message:'something is missing'})
    
   }
}

// fetch user cart data

const getCart = async (req,res) =>{
    try {
        let userdata = await userModel.findById(req.body.userId);
        let cartData = await userdata.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }
}

export{addToCart,removeFromCart,getCart,addToCartBtn,getAddtoCartBtn,}

// 7:28 minute save the playlist
