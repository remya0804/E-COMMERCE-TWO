import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {

  const {productsArray,currency,backend_url,token} = useContext(ShopContext);

  const [orderData,setOrderData] = useState([])

  const loadOrderData = async () => {

    try {

      if(!token){

        return null
      }

      const response = await axios.post(backend_url + '/api/order/user-orders',{},{headers:{token}})

      if(response.data.success){

        let orderedItems = []

        response.data.userOrder.map((order) => {

          order.items.map((item) => {

            item['status'] = order.status
            item['paymentMethod'] = order.paymentMethod
            item['payment'] = order.payment
            item['date'] = order.date

            orderedItems.push(item)
          })


        })

        setOrderData(orderedItems.reverse());
        
      }
      
      
    } catch (error) {

      console.log(error);

      toast.error(error.message)
      
      
    }
  }

  useEffect(() => {

    loadOrderData()
  },[token])


  return (

    <div className='pt-16 border-t'>

      <div className='text-2xl'>

        <Title text1={'MY'} text2={'ORDERS'}/>


      </div>

      <div>

        {

          orderData.slice(0,4).map((item,idx) => {

            return <div key={idx} className='border-t border-b py-4 text-gray-700 flex flex-col gap-2 md:flex-row md:items-center md:justify-between'> 

            <div className='flex items-start gap-6 text-sm'>

              {/* <img className='w-10 sm:w-16' src={item.image} alt="" /> */}
              <img className='w-10 sm:w-16' src={item.images[0]} alt="" />

              <div>

                <p className='font-medium sm:text-base'>{item.name}</p>

                <div className='flex items-center gap-3 text-gray-700 text-base mt-1'>

                  <p className='text-lg'>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>


                </div>

                <p className='mt-4'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                <p className='mt-4'>Payment Method: <span className='text-gray-400'> {item.paymentMethod}</span></p>

              </div>


            </div>

            <div className='md:w-1/2 flex justify-between '>

              <div className='flex items-center gap-2'>

                <p className='min-w-2 h-2 rounded-full bg-green-500'>{}</p>

                <p className='text-sm lg:text-base'>{item.status}</p>


              </div>

              <button onClick={() => loadOrderData()} className='border px-4 py-2 text-sm font-medium rounded '>Track Order</button>


            </div>


            </div>


          })
        }
      </div>
      

    </div>
  )
}

export default Orders