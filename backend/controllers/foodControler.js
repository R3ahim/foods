import { error } from "console";
import foodModel from "../models/foodModel.js";
import fs from 'fs'



// add food item
const addFood = async(req,res) =>{
    
    let image_filename =   `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
        sizes:[
          {size:'small',price:17,id:'small'},
          {size:'Midcore',price:24,id:'midcore'},
          {size:'Large',price:28,id:'large'},
        ],
        meats:[
          {name:'Checken Meat',price:0,id:'1'},
          {name:'lamb meat',price:0,id:'2'},
          {name:'Mixed meat',price:0,id:'3'},
        ],
        sauces:[
          {name:'garlic Sauce',price:'0',id:'1'},
          {name:'mild sauce',price:0,id:'2'},
          {name:'Ketchup',price:0,id:'3'},
          {name:'hot sauce',price:0,id:'4'},
          {name:'BBQ sauce',price:0,id:'5'},
          {name:'dill sauce',price:0,id:'6'},
        ],
    })
    try {
        await food.save();
        res.json({success:true,message:"food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error why it heppedn"})
    }


}


// all food list
const listFood = async (req,res) =>{
     try {
        const foods = await foodModel.find({});
        res.json({succes:true,data:foods})
     } catch (error) {
        console.log(error);
        res.json({success:false,message:("Eroror")})
     }
}

const foodDetails = async(req,res)=>{
    const id = req.params.id;

      try {
        const order = await foodModel.findById({_id:id});
        res.json({success:true,data:order})
        console.log(id)
      } catch (error) {
        console.log(error)
        res.json({success:false,message:'eoror are looking me'})
        
      }
    }

const removeFood = async(req,res)=>{
       try{
        const food= await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({succes:true,message:"food Reoved"})
       }
       catch(error){
        console.log(error)
        res.json({success:false,message:"Eroror"})
       }
}


export {addFood,listFood,removeFood,foodDetails} 