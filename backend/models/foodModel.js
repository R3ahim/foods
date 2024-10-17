import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description: {type:String,required:true},
    price:{type:Number,required:true},
    category:{type:String,required:true},
    image:{type:String,required:true},
    sizes:{type:Array,default:true},
    meats:{type:Array,default:true},
    sauces:{type:Array,default:true},
    
})
const foodModel =mongoose.models.food || mongoose.model("food",foodSchema);


export default foodModel;

