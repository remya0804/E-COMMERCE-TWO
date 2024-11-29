import userModel from "../models/userModel.js";

const addToCart = async (req,res) => {

   try {

    const {userId,id,size} = req.body;

    const userData = await userModel.findById(userId)

    let cartData = userData.cartData

    if( cartData[id]){

        if(cartData[id][size]){

            cartData[id][size] += 1
        } else{

            cartData[id][size] = 1
        }


    } else{

        cartData[id] = {}
        cartData[id][size] = 1
    }
    
    await userModel.findByIdAndUpdate(userId,{cartData})

    res.json({success: true ,message: "Product added"})

   } catch (error) {

    console.log(error);
    res.json({success: false ,message: error.message})

     
   }

}

const addQuantity = async (req,res) => {

    try {

        const {userId,id,size,quantity} = req.body;
    
        const userData = await userModel.findById(userId)
    
        let cartData = userData.cartData
    
        cartData[id][size] = quantity + 1;
        
        await userModel.findByIdAndUpdate(userId,{cartData})
    
        res.json({success: true ,message: "Cart Updated"})
    
       } catch (error) {
    
        console.log(error);
        res.json({success: false ,message: error.message})

        
       }
}
const removeQuantity = async (req,res) => {

    try {

        const {userId,id,size,quantity} = req.body;
    
        const userData = await userModel.findById(userId)
    
        let cartData = userData.cartData
    
        cartData[id][size] = quantity - 1;
        
        await userModel.findByIdAndUpdate(userId,{cartData})
    
        res.json({success: true ,message: "Cart Updated"})
    
       } catch (error) {
    
        console.log(error);
        res.json({success: false ,message: error.message})

        
       }
}

const getCartData = async (req,res) => {

    try {

        const {userId} = req.body;
    
        const userData = await userModel.findById(userId)
    
        let cartData = userData.cartData

        res.json({success: true ,cartData})
        
    } catch (error) {

        console.log(error);
        res.json({success: false ,message: error.message})
        
    }




}

export  {addToCart,getCartData,addQuantity,removeQuantity}

