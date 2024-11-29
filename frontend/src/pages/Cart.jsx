import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';

import { IoAdd } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const {cartItems,addQuantity,removeQuantity} = useContext(ShopContext);

  const [cartData,setCartData] = useState([]);

  const {productsArray,currency} = useContext(ShopContext);

  const navigate = useNavigate();


  useEffect(() => {

    if(productsArray.length > 0){

      const cartDataCopy = [];

    for(const i in cartItems){

      for(const j in cartItems[i]){

        if(cartItems[i][j] > 0){

          cartDataCopy.push(

            {

              _id: i,
              size: j,
              quantity: cartItems[i][j]
            }
          )


        }
      }
    }

    setCartData(cartDataCopy);


    }
    

    
    
  },[cartItems,productsArray])

console.log(cartData)

// const getItemTotal = (id,price,size) => {

//   let total = 0;

//   for(const i in cartData){

//     if(cartData[i]._id == id && cartData[i].size== size){

//       total += cartData[i].quantity * price


//     }
//   }

//   return total
// }


  return (

    <div className='border-t pt-4'>

      <div className='text-2xl mb-3'>

        <Title text1={'YOUR'} text2={'CART'}/>

        {

          cartData.map((item,idx) => {

            const productInfo = productsArray.find((p) => p._id == item._id)

            return <div key={idx} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[4fr_1fr_1fr] items-center gap-3'> 

              <div className='flex items-start gap-6'>

                {/* <img className='w-10 sm:w-16' src={productInfo.image} alt="" /> */}
                <img className='w-10 sm:w-16' src={productInfo.images[0]} alt="" />

                <div>

                  <p className='text-xs sm:text-lg font-medium'>{productInfo.name}</p>

                  <div className='mt-2 flex items-center gap-3'>

                    <p className='text-xs sm:text-lg'>{currency}{productInfo.price}</p>

                    <p className='text-xs sm:text-lg px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>


                  </div>

                </div>


              </div>

              

              <div className='flex  items-center gap-2'>

                <IoRemove  onClick={() => removeQuantity(item._id,item.size,item.quantity)}  className='text-xs sm:text-lg' />          

                <p className='max-w-10 text-center text-xs sm:text-lg sm:max-w-20 border px-1 sm:px-2 py-1 ' >{item.quantity} </p>

               <IoAdd onClick={() => addQuantity(item._id,item.size,item.quantity)} className='text-xs sm:text-lg'  />


              </div>

              {/* <p  className='text-xs sm:text-lg'>{currency}{getItemTotal(item._id,productInfo.price,item.size).toFixed(2)}</p> */}
              <p  className='text-xs sm:text-lg'>{currency}{productInfo.price*item.quantity.toFixed(2)}</p>


            </div>
          })
        }


      </div>

      <div className='flex justify-end my-20'>

        <div className='w-full sm:w-[450px]'>

          <CartTotal />

          <div className='w-full text-end'>

            <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>


          </div>

        </div>


      </div>

      

    </div>
  )
}

export default Cart