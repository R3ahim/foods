import userModel from '../models/userModel.js'


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

export{addToCart,removeFromCart,getCart}

// 7:28 minute save the playlist
