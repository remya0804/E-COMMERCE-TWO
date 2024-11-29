import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category,type,id}) => {

    const {productsArray,currency} = useContext(ShopContext);

    const [relatedProducts,setRelatedProducts] = useState([]);

    useEffect(() => {

        if(productsArray.length> 0){
          

          let productsArrayCopy = productsArray.slice();

          productsArrayCopy = productsArrayCopy.filter((item) => item.category === category);

          productsArrayCopy = productsArrayCopy.filter((item) => item.type === type);

          productsArrayCopy = productsArrayCopy.filter((item) => item._id !== id);

          setRelatedProducts(productsArrayCopy.slice(0,5))


        }
    },[productsArray])

  return (

    <div className='my-24'>

      <div className='text-center text-3xl py-2'>

        <Title text1={'Related'} text2={'Products'}/>

      </div>

      <div  className='grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>

          {
            relatedProducts.map((item,idx) => {

              return  <div key={idx} onClick={scrollTo(0,0)}>
              
              <ProductItem   id={item._id} image={item.image} name={item.name} price={item.price} />

              </div>
            })
          }
        </div>
      

    </div>
  )
}

export default RelatedProducts