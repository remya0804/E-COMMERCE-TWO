import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {

    return jwt.sign({id},process.env.JWT_SECRET)
}


const registerUser = async (req,res) => {

    try {

        const {name,email,password} = req.body;

        const userExists = await userModel.findOne({email});
    
        if(userExists){
    
            return res.json({success:false, message: "User Already Exists"})
        }
    
        if(!validator.isEmail(email)){
    
            return res.json({success: false, message: "Please enter a valid email" }) 
        }
        if(password.length < 8){
    
            return res.json({success: false, message: "Please enter a strong password" }) 
        }

        // hashing

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })        

        const addedUser = await newUser.save();

        const token = createToken(addedUser._id)

        res.json({success: true, token }) 
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
        
    }

   
}

const loginUser = async (req,res) => {

    try {

        const {email,password} = req.body;

        const existingUser = await userModel.findOne({email});
    
        if(!existingUser){
    
            return res.json({success:false, message: "User doesn't Exists"})
        }

        const passwordMatch = await bcrypt.compare(password,existingUser.password)

        if(passwordMatch){

            const token = createToken(existingUser._id)
            return res.json({success:true, token})

        } else{

            return res.json({success:false, message: "Invalid credentials"})
        }
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
        
    }

    
}


const adminLogin = async (req,res) => {

    try {

        const {email,password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ){

            const token = jwt.sign(email+password,process.env.JWT_SECRET)

            return res.json({success: true,token}) 

        } else{

            return res.json({success: false,message: "Invalid credentials"}) 
        }
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
    }


}


export {loginUser,registerUser,adminLogin}




// {
//     "name":"adithi",
//     "email":"adthithi@gmail.com",
//     "password":"srdfgujbjbj"
// }