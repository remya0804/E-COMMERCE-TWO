import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
import { backend_url, currency } from '../App'

import { GoPackage } from "react-icons/go";

const Orders = ({token}) => {

  const [orders,setOrders] = useState([])

  const fetchAllOrders  = async () => {

    if(!token){

      return null
    }

    try {

      const response = await axios.post(backend_url + '/api/order/all-orders',{},{headers: {token}})

      console.log(response.data);
      

     if(response.data.success){

      setOrders(response.data.allOrders)
     } else{

      toast.error(response.data.message)
     }
      
      
    } catch (error) {

      console.log(error);
      toast.error(error.message)
      
      
    }

  }

  const updateStatus = async (e,orderId) => {

    try {

      const response = await axios.post(backend_url + '/api/order/update-orders-status', {orderId,status: e.target.value},{headers:{token}})

      if(response.data.success){

        fetchAllOrders()
      } else {

        toast.error(response.data.message)
      }
      
    } catch (error) {

      console.log(error);
      toast.error(error.message)
      
    }


  }

  useEffect(() => {

    fetchAllOrders()

  },[token])


  return (
    <div>

      <h3>All Orders </h3>

      <div>

        {

          orders.map((order,idx) => {

            return <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.3fr_2fr_1fr_0.5fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={idx}>

                      <GoPackage className='text-2xl'/>

                      <div>

                          <div>

                            {

                              order.items.map((item,idx) => {

                                if(idx === order.items.length -1){

                                  return <p className='py-0.5' key={idx} > {item.name} x {item.quantity} <span> {item.size} </span>    </p>

                                } else{

                                  return <p className='py-0.5' key={idx}>{item.name} x {item.quantity} <span> {item.size} </span></p> 
                                }
                              })
                            }


                          </div>

                          <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " +order.address.lastName }</p>

                          <div>

                            <p>{order.address.street + ","} </p>
                            <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode } </p>
                          </div>

                          <p>{order.address.phone}</p>

                      </div>

                      <div>

                        <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                        <p className='mt-3'>Method : {order.paymentMethod}</p>
                        <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                        <p>Date : {new Date(order.date).toDateString()}</p>

                      </div>

                      <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>

                      <select value={order.status} onChange={(e) => updateStatus(e,order._id)} className='p-2 font-semibold' name="" id="">

                        <option value="Order Placed">Order Placed</option>
                        <option value="Packing">Packing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>

                      </select>


            </div>
          })
        }
      </div>
      

    </div>
  )
}

export default Orders