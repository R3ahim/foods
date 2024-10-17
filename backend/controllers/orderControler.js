import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe'


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// placing user order for frontend 

const placeOrder = async(req,res) =>{
    const frontend_url = 'http://localhost:5173'
    const paymentMethod = req.body.address.method;
    

    console.log('paymentMethod',paymentMethod)

    
   try {
       const newOrder = new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address,
       })
       

       console.log(req.body.items)
       await newOrder.save();
       await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
       
       const line_items = req.body.items.map((item)=>({
              //  const extraSum = req.body.items.extra.reduce((acc, item) => acc + item.price * item.quanity, 0)
      //  const sauceSum = req.body.items.extraSauce.reduce((acc, item) => acc + item.price * item.quanity, 0)
        price_data:{
         currency:"pln",
         product_data:{
             name:item.name + '||'+ 'Extras + Sauce',   
         },
         unit_amount: item.extra.reduce((acc, item) => acc + item.price * item.quanity, 0) * 100 + item.extraSauce.reduce((acc, item) => acc + item.price * item.quanity, 0) * 100 +item.sizePrice*100 
        },
        quantity:item.quantity
 }))

  line_items.push({
    price_data:{
        currency:'pln',
        product_data:{ 
            name:"Delevery charges"
        },
        unit_amount:req.body.deliverFee *100
    },
    quantity:1
  })

  if(paymentMethod==='Online Payment'){
    const session = await stripe.checkout.sessions.create({
      line_items:line_items,
  
      mode:"payment",
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })
    
    res.json({success:true,session_url:session.url})
  }
 
  else{
    res.json({success:true,session_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`})


  }

       
   } catch (error) {
    console.log(error);
    res.json({success:false,message:"errore"})
   }

}

const verifyOrder = async (req,res) =>{
  const {orderId,success} = req.body;
  try {
    if (success=='true') {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Not Paid"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"error"})
  }

}



//  user Orders for frontend

const userOrders = async(req,res) =>{
  try {
     const orders = await orderModel.find({userId:req.body.userId});
     res.json({success:true,data:orders})
  } catch (error)
   {
    console.log(error);
    res.json({success:false,message:"error"})
    
  }

}

// getting all orders for admin

const listOrders = async (req,res) =>{
     try {
      const orders = await orderModel.find({});
      res.json({success:true,data:orders})

     } catch (error) {
      console.log(error)
      res.json({success:false,message:'eroror some thing fetch'})
      
     }
}



// api for updating order status

const updateStatus = async (req,res)=>{
try {
  await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
  res.json({success:true,message:"status Updated"})

} catch (error) {
  console.log(error);
  res.json({success:false,message:'error'})
  
  
}

}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus};


// video on 8:51:44
