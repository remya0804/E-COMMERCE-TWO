import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  const {productId} = useParams();
  const {productsArray,currency,cartItems,addToCart} = useContext(ShopContext);

  const [productInfo,setProductInfo] = useState(false);
  const [image,setImage] = useState("");

  const [size,setSize] = useState("");

  const fetchProductInfo = async () => {

    productsArray.map((item) => {

      if(item._id == productId){

        setProductInfo(item);
        // setImage(item.image)
        setImage(item.images[0])
        return null;
      }
    })

  }

  // console.log(productInfo);
  // console.log(image);
  // console.log(productInfo.stars);


  useEffect(() => {

    fetchProductInfo();

  },[productId,productsArray])

   return productInfo ? (

    <div className='pt-10 border-t-2 opacity-100 transition-opacity ease-in duration-500'>

      <div className='flex flex-col gap-12 sm:flex-row sm:gap-12'>

        {/* images */}

        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>

          <div className='flex justify-between sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:justify-normal w-full sm:w-[18.7%] '>

            {

              productInfo.images.map((img,idx) => {

                return <img onClick={() => setImage(img)} src={img} key={idx} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              })
            }


          </div>

          <div className='w-full sm:w-[80%]'> 

            <img className='w-full h-auto' src={image} alt="" />


          </div>


        </div>

        {/* info */}

        <div className='flex-1'>

          <h1 className='mt-2 font-medium text-2xl'>{productInfo.name}</h1>

          <div className='flex items-center mt-2'>

            <img className='w-[22px]' src={productInfo.stars} alt="" />
            <img className='w-[22px]' src={productInfo.stars} alt="" />
            <img className='w-[22px]' src={productInfo.stars} alt="" />
            <img className='w-[22px]' src={productInfo.stars} alt="" />
            <img className='w-[22px]' src={productInfo.stars} alt="" />

            <p className='pl-4'>122</p>


          </div>

          <p className='text-3xl font-medium mt-5'>{currency}{productInfo.price}</p>

          <p className='mt-5 text-gray-500 sm:w-4/5'>{productInfo.description}</p>

          <div className='flex flex-col gap-4 my-8'>

            <p>Select Size</p>

            <div className='flex gap-2'>

              {

                productInfo.sizes.map((item,idx) => {

                  return <button onClick={() => setSize(item)} key={idx} className={`px-4 py-2 border bg-gray-100 ${size === item ? "border-gray-900" : ""}`}> {item}</button>
                })
              }


            </div>


          </div>

          <button onClick={() => addToCart(productId,size)} className='bg-black text-white px-8 py-3  text-sm active:bg-gray-700'>ADD TO CART</button>

          <hr className='mt-8 sm:w-4/5' />

          <div className='text-sm text-gray-500 flex flex-col gap-1 mt-5'>

            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>


          </div>


        </div>


      </div>

      {/* description */}

      <div className='mt-20'>

        <div className='flex'>

          <b className='border px-5 py-3 text-sm '>Description</b>

          <p className='border px-5 py-3 text-sm' >Reviews(122)</p>


        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>

          <p>Experience the perfect blend of comfort and style with this versatile piece, designed to complement every wardrobe. Made from high-quality materials, it ensures durability, breathability, and ease of wear. Featuring a timeless design, this item is suitable for any occasion, whether casual, formal, or anything in between. Easy to care for and available in multiple sizes, it’s the ultimate choice for effortless fashion. Pair it with your favorite accessories to complete the look!</p>

          <p> Featuring a timeless design, this item is suitable for any occasion, whether casual, formal, or anything in between. Easy to care for and available in multiple sizes, it’s the ultimate choice for effortless fashion. Pair it with your favorite accessories to complete the look!</p>


        </div>


      </div>

      <RelatedProducts category={productInfo.category} type={productInfo.type} id={productInfo._id}/>
      

    </div>
  )

  : <div className='opacity-0'> </div>
}

export default Product