import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
     address:{type:Object,required:true},
     status:{type:Object,default:"Food Processing"},
     date:{type:Date,default:Date.now()},
     payment:{type:Boolean,default:false},
})


const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);


export default orderModel;
























/// how to use schema in 

// 1. create order models in models file
// 2 intergrete with mongoose
// // difne a function name OrderSchema
/// 