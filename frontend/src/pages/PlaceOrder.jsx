import React, { useContext, useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

import stripe from '../assets/stripe.png'
import razor from '../assets/razor.png'
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';


const PlaceOrder = () => {

  const [paymentMethod,setPaymentMethod] = useState('cod'); 

  const {navigate,backend_url,token,cartItems,setCartItems,getCartTotal,delivery_fee,productsArray} = useContext(ShopContext);

  const [formData,setFormData] = useState({

    firstName: "" ,
    lastName: "" ,
    email: "" ,
    street: "" ,
    city: "" ,
    state: "" ,
    zipcode: "" ,
    country: "" ,
    phone: "" 
    
  })
  

  const onChangeHandler =  (e) => {

    const name = e.target.name
    const value = e.target.value

    setFormData(prev =>( {...prev,[name]:value}))
  }

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      let orderItems = []

      for (const i in cartItems){

        for (const j in cartItems[i]){

          if(cartItems[i][j] > 0){

            const itemInfo = structuredClone( productsArray.find((p) => p._id === i))

            if(itemInfo){

              itemInfo.size = j
              itemInfo.quantity = cartItems[i][j]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {

        address:formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee,

      }

      switch(paymentMethod){

        case 'cod':

          const response = await axios.post(backend_url + '/api/order/place-order',orderData,{headers:{token}})          

          if(response.data.success){

            setCartItems({})
            navigate('/orders')
          }

          break;

        case 'stripe':

          const responseStripe = await axios.post(backend_url + '/api/order/place-order-stripe',orderData,{headers:{token}})
          
          
          if(responseStripe.data.success){

            const {session_url} = responseStripe.data

            window.location.replace(session_url)

          } else{

            toast.error(responseStripe.data.message)
          }


          break;



          default:

            break;
      }


      
    } catch (error) {

      console.log(error);

      toast.error(error.message)
      
      
    }
  }

  return (

    <form onSubmit={(e) => onSubmitHandler(e)} className='min-h-[80vh] flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 '>

      <div className='w-fuu flex flex-col gap-4 sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3 '>

          <Title text1={'DELIVERY'} text2={'DETAILS'}/>

        </div>

        <div className='flex gap-3'>
          
          <input required onChange={(e) => onChangeHandler(e)} value={formData.firstName} name='firstName' type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='First name'/>
          <input required onChange={(e) => onChangeHandler(e)} value={formData.lastName} name='lastName' type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Last name'/>

        </div>

        <input required onChange={(e) => onChangeHandler(e)} value={formData.email} name='email'  type="email" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Email Id'/>
        <input  required onChange={(e) => onChangeHandler(e)} value={formData.street} name='street' type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Street'/>

        <div className='flex gap-3'>
          
          <input required onChange={(e) => onChangeHandler(e)} value={formData.city} name='city' type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='City'/>
          <input required onChange={(e) => onChangeHandler(e)} value={formData.state} name='state'  type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='State'/>

        </div>
        <div className='flex gap-3'>
          
          <input required onChange={(e) => onChangeHandler(e)} value={formData.zipcode} name='zipcode'   type="number" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Zipcode'/>
          <input required   onChange={(e) => onChangeHandler(e)} value={formData.country} name='country'    type="text" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Country'/>

        </div>

        <input required type="number" className='border border-gray-300 rounded px-3.5 py-1.5 w-full' placeholder='Contact number'/>


      </div>

      <div className='mt-8'>

        <div className='mt-8 min-w-60'> 

          <CartTotal />

        </div>

        <div className='mt-12'> 

          <Title text1={'PAYMENT'} text2={'METHOD'}/>

          <div className='flex flex-col gap-3 lg:flex-row'>

            <div onClick={() => setPaymentMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>

              <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod==="stripe" ? "bg-green-400" : ""}`}></p>

              <img className='h-10 mx-4' src={stripe} alt="" />

            </div>
            {/* <div onClick={() => setPaymentMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>

              <p className={`min-w-3.5 h-3.5 border rounded-full  ${paymentMethod==="razorpay" ? "bg-green-400" : ""}`}></p>

              <img className='h-12 mx-4' src={razor} alt="" />

            </div> */}
            <div onClick={() => setPaymentMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>

              <p className={`min-w-3.5 h-3.5 border rounded-full  ${paymentMethod==="cod" ? "bg-green-400" : ""}`}></p>

              <p className='text-sm font-medium text-gray-500 mx-4'>CASH ON DELIVERY</p>

            </div>


          </div>


        </div>

        <div className='w-fll mt-8 text-end'>

          <button type='submit' className='bg-black text-white text-sm px-16 py-3'>PLACE ORDER</button>


        </div>

        


      </div>


    </form>

  )
}

export default PlaceOrder