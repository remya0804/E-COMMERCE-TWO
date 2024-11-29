import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';


const CartTotal = () => {

    const {currency,delivery_fee,getCartTotal} = useContext(ShopContext);

    
  return (

    <div className='w-full'>

        <div className='text-2xl'>

            <Title text1={'Total'} text2={'Amount'}/>

        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm '>

            <div className='flex justify-between'>

                <p>SubTotal</p>

                <p>{currency}{getCartTotal() === 0 ? 0 : getCartTotal().toFixed(2)}</p>


            </div>

            <hr />

            <div className='flex justify-between'>

                <p>Shipping Fee</p>

                <p>{currency}{delivery_fee.toFixed(2)}</p>


            </div>

            <hr />

            <div className='flex justify-between'>

                <b>Total</b>

                <p>{currency}{getCartTotal() === 0 ? 0 : (getCartTotal() + delivery_fee).toFixed(2)}</p>


            </div>




        </div>
        

    </div>
  )
}

export default CartTotal