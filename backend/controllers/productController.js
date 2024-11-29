import cloudinary from 'cloudinary'
import productModel from '../models/productModel.js';

const addProduct = async (req,res) => {

    try {

        const { name,price,type,category,description,sizes,bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image3 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((img) => img !== undefined)

        let imageUrl = await Promise.all(

            images.map(async (item) => {

                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                return result.secure_url
            })
        )

        const productData = {
            name,
            price: Number(price),
            type,
            category,
            description,
            sizes:JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            date:Date.now(),
            images:imageUrl


        }

        const productAdded = new productModel(productData)

        await productAdded.save()


        return res.json({success:true,message: "Product Added"})


        
    } catch (error) {
        console.log(error);

        return res.json({success: false, message: error.message}) 
        
    }

    
}

const allProducts = async (req,res) => {

    try {

        const allProducts = await productModel.find({});
        
        return res.json({success:true,allProducts})
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
        
    }


}


const removeProduct = async (req,res) => {

    try {

        await productModel.findByIdAndDelete(req.body.id);
        
        return res.json({success:true,message: "Product removed"})
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
        
    }


}


const singleProduct = async (req,res) => {

    try {

        // const {productId} = req.body;

        // const product = await productModel.findById(productId);
        const product = await productModel.findById(req.body.id);
        
        return res.json({success:true,product})
        
    } catch (error) {

        console.log(error);

        return res.json({success: false, message: error.message}) 
        
        
    }


}

export {allProducts,singleProduct,addProduct,removeProduct}



// {
          
//     "name":"Floral Summer Dress",
//     "price":"49.99",          
//     "type":"Casual",
//     "category":"Women",
//     "description":"A breezy and elegant floral summer dress, perfect for sunny days and casual outings with its lightweight fabric and vibrant prints.",
//     "sizes": ["S","M"],
//     "bestSeller":"false",
// }