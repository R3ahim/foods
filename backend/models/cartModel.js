import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    itemId:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String,required:true},
    sizeId:{type:String,required:true},
    sizePrice:{type:Number,required:true},
    meatId:{type:Object,required:true},
    sauceId:{type:Object,default:true},
    extra:{type:Array,required:false},
    extraSauce:{type:Array,required:false},
    
    //  :{type:Date,default:Date.now()},
    //  payment:{type:Boolean,default:false},
})


const cartModel = mongoose.models.cart || mongoose.model("cart",orderSchema);


export default cartModel;

