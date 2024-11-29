import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backend_url, currency } from '../App';
import { toast } from 'react-toastify';
import { IoCloseCircleSharp } from "react-icons/io5";


const AllProducts = ({token}) => {

  const [list,setList] = useState([])



  const fetchList = async () => {

    try {

      const response = await axios.get(backend_url + '/api/product/all-product')

      if(response.data.success){

        setList(response.data.allProducts)

      } else{

        toast.error(response.data.message)
      }
      
    } catch (error) {

      console.log(error)
      
    }
console.log(list);


  }

  const removeProduct = async (id) => {

    try {

      const response = await axios.post(backend_url + '/api/product/remove-product',{id} ,{headers:{token}} )

      if(response.data.success){

        toast.success(response.data.message)

        await fetchList()
      } else{

        toast.error(response.data.message)
      }
      
    } catch (error) {

      console.log(error)
      
    }


  }

  useEffect(() => {

    fetchList();

  },[])
 


  return (
    
    <>

    <p className='mb-2 '>All Products List</p>

    <div className='flex flex-col gap-2'>

      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border bg-gray-100 text-sm'>

        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>


      </div>

      {

        list.map((item,idx) => {

          return <div className='grid  grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 items-center gap-2 py-1 px-2 border text-sm' key={idx}> 

              <img src={item.images[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              {/* <p className='text-right md:text-center cursor-pointer text-lg'>x</p> */}

              <div className='flex justify-center  cursor-pointer'>

                <IoCloseCircleSharp onClick={() => removeProduct(item._id)}  className=' text-lg'/>

              </div>
              
             


          </div>


        })
      }


    </div>
    
    </>
  )
}

export default AllProducts