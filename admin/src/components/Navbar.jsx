import React from 'react'
import { SiThreads } from "react-icons/si";


const Navbar = ({setToken}) => {
  return (
    <div className='py-5 px-4 flex items-center justify-between font-medium'>

        <div className='flex flex-col items-end'>
        
            <div className='flex items-center'>

                <SiThreads className='text-base sm:text-lg md:text-lg lg:text-3xl text-pink-500 uppercase' />   
            
                <p className='text-base sm:text-lg md:text-lg lg:text-3xl text-gray-700 uppercase font-bold'>Clothique</p>
            
            </div>

            <p className='text-pink-500  text-sm sm:text-lg  font-medium'>Admin Panel</p>

        </div>

        <button onClick={() => setToken("")} className='bg-gray-600 text-white text-sm px-4 py-1 sm:px-7 sm:py-2 rounded-full'>Logout</button>

    </div>
  )
}

export default Navbar