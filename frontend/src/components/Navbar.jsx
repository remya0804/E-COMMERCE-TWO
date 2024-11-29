import React, { useContext, useState } from 'react'
import {Link, NavLink} from 'react-router-dom'

import { SiThreads } from "react-icons/si";
import { IoIosSearch } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import profile from '../assets/profile.png'
import { IoChevronBackOutline } from "react-icons/io5";

import { FiMenu } from "react-icons/fi";
import { ShopContext } from '../context/ShopContext';



const Navbar = () => {

  const [menu,setMenu] = useState(false);

  const {showSearch,setShowSearch,getCartCount,token,setToken,setCartItems,navigate}  = useContext(ShopContext);

  const logOutFunction = () => {

    localStorage.removeItem('token')
    setToken("")
    setCartItems({})
    navigate('/login')
  }

  return (
    
    <div className='py-5 flex items-center justify-between font-medium'>

      <Link to='/'>

        <div className='flex items-center'>

            <SiThreads className='text-base sm:text-lg md:text-lg lg:text-3xl text-pink-500 uppercase' />   
          
            <p className='text-base sm:text-lg md:text-lg lg:text-3xl text-gray-700 uppercase font-bold'>Clothique</p>
          
        </div>

      </Link>

      <ul className='text-xs md:text-sm text-gray-700 hidden sm:flex gap-5'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>

          <p className='capitalize'>HOME</p>
          <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
       
        <NavLink to='/about' className='flex flex-col items-center gap-1'>

          <p className='capitalize'>ABOUT</p>
          <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />

        </NavLink>

        <NavLink to='/collection' className='flex flex-col items-center gap-1'>

          <p className='capitalize'>COLLECTION</p>
          <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />

        </NavLink>

        <NavLink to='/contact' className='flex flex-col items-center gap-1 '>

          <p className='capitalize'>CONTACT</p>
          <hr className='w-2/4 h-[1.5px] bg-gray-700 hidden' />

        </NavLink>


      </ul>

      <div className='flex items-center gap-6'>

        <Link to='/collection'>

          <IoIosSearch onClick={() => setShowSearch(true)} className='text-lg md:text-3xl cursor-pointer'/>

        </Link>

        <div className='group relative'>       

          <img onClick={() => {token ? null : navigate('/login')}} className='w-5 h-5 md:w-8 md:h-8 cursor-pointer' src={profile} alt="" />

          {

            token && <div className='absolute right-0 pt-4 hidden group-hover:block dropdown-menu '>

            <div className='w-36 px-5 py-3 bg-slate-100 flex flex-col gap-2 text-gray-500 rounded'>

              <p className='hover:text-black cursor-pointer'>My Profile</p>
              <p onClick={() =>navigate('/orders')} className='hover:text-black cursor-pointer'>Orders</p>
              <p onClick={() =>logOutFunction()} className='hover:text-black cursor-pointer'>Logout</p>


            </div>


          </div>
          }
          

        </div>

        <Link to='/cart' className='relative'>

          <IoBagOutline className='text-lg md:text-3xl' />
          <p className='w-3 md:w-4 text-center bg-black text-white text-[6px] md:text-[8px] leading-3 md:leading-4 absolute right-[-5px] bottom-[-5px] rounded-full'>{getCartCount()}</p>

        </Link>

        <FiMenu onClick={() => setMenu(true)}  className='text-lg md:text-3xl sm:hidden cursor-pointer'/>

      </div>

      <div className={`absolute top-0 right-0 bottom-0 bg-white overflow-hidden transition-all ${menu ? 'w-full' : 'w-0'} `}>

        <div className='flex flex-col text-gray-600 cursor-pointer'>

          <div onClick={() => setMenu(false)} className='flex items-center gap-4 p-3'>

            <IoChevronBackOutline className='text-3xl' />

            <p>BACK</p>

          </div>

          <NavLink className='py-2 pl-6 border' to= '/' onClick={() => setMenu(false)}>HOME</NavLink>
          <NavLink className='py-2 pl-6 border' to= '/about' onClick={() => setMenu(false)}>ABOUT</NavLink>
          <NavLink className='py-2 pl-6 border' to= '/collection' onClick={() => setMenu(false)}>COLLECTION</NavLink>
          <NavLink className='py-2 pl-6 border' to= '/contact' onClick={() => setMenu(false)}>CONTACT</NavLink>

        </div>


      </div>

    </div>
  )
}

export default Navbar