import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator'


//login user

const loginUser = async (req,res) =>{
    const {email,password} = req.body;
    try {
        
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"user Dosent's exist"})
            
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,message:"invalid Credentaals"})
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    } catch (error) {

        console.log(error);
        res.json({success:false,message:"Erorr "})
    }

}
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// all user geting
const listUser = async (req,res) =>{
    try {
       const users = await userModel.find({});
       res.json({succes:true,data:users})
    } catch (error) {
       console.log(error);
       res.json({success:false,message:("Eroror")})
    }
}
// remove user

const removeUser = async(req,res)=>{
    try{
     const food= await userModel.findById(req.body.id)
     await userModel.findByIdAndDelete(req.body.id);
     res.json({succes:true,message:"user removed"})
    }
    catch(error){
     console.log(error)
     res.json({success:false,message:"Eroror"})
    }
}


// register user

const registerUser = async (req,res) =>{
const {name,password,email} = req.body;
try {
    // cheking is user already exists
    const exists = await userModel.findOne({email});
    if(exists){
        return res.json({success:false,message:"user already exists"})
    }
    // validating email formate and strong password
    if (!validator.isEmail(email)) {
        return res.json({success:false,message:"please enter a valid email"})
    }

if (password.lenggth<6){
     
    return res.json({success:false,message:"please enter a strong passsoword"})

    
}

// hasing user password
const salt = await bcrypt.genSalt(8);
const hashedPassword = await bcrypt.hash(password,salt);
const newUser = new userModel({
    name:name,
    email:email,
    password:hashedPassword
})
const user = await newUser.save();
const token = createToken(user._id)
res.json({success:true,token})
 
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}

export {loginUser,registerUser,listUser,removeUser}