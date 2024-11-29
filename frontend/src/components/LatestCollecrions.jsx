import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';

const LatestCollecrions = () => {

    const {productsArray} = useContext(ShopContext);

    const [latestProducts,setLatestProducts] = useState([]);

    useEffect(() => {

        setLatestProducts(productsArray.slice(0,10));

    },[productsArray])

// console.log(productsArray)
// console.log(latestProducts)

  return (

    <div className='my-10'>

        <div className='py-8 text-center text-3xl'>

            <Title text1={'LATEST'} text2={'COLLECTIONS'}/>

            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>

                "Step into elegance with our latest collection—crafted to inspire confidence and timeless style. ✨👗"
            </p>


        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>

            {

                latestProducts.map((item,idx) => {

                //   return  <ProductItem key={idx} id={item._id} image={item.image} name={item.name} price={item.price} />
                  return  <ProductItem key={idx} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
                })
            }


        </div>
        
    </div>
  )
}

export default LatestCollecrions