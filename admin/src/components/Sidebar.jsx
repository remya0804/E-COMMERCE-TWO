import React from 'react'

import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { CiViewList } from "react-icons/ci";
import { NavLink } from 'react-router-dom';



const Sidebar = () => {
  return (

    <div className='w-[20%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[10%] text-[14px]'>

            <NavLink to='/add-product' className='flex items-center gap-2 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                <IoAddCircleOutline className='text-2xl' />

                <p className='hidden md:block'>Add Product</p>

            </NavLink>
            <NavLink to='/all-products' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                <AiOutlineProduct className='text-2xl' />

                <p className='hidden text-sm md:block'>All Products</p>

            </NavLink>
            <NavLink to='/orders' className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>

                <CiViewList className='text-2xl' />

                <p className='hidden text-sm md:block'>Orders</p>

            </NavLink>
            

        </div>

    </div>
  )
}

export default Sidebar