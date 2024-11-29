import React from 'react'

import { RiExchangeFundsFill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { SlEarphonesAlt } from "react-icons/sl";

const OurPolicy = () => {

  return (

    <div className='flex flex-col sm:flex-row justify-around  sm:items-end gap-12 sm:gap-2 text-center text-xs sm:text-sm  py-20 md:text-base text-gray-700'>

        <div>

            <div className='flex justify-center'>
                <RiExchangeFundsFill className='text-5xl' />
            </div>

            <p className='font-semibold'>Easy Exchange Policy</p>

            <p className='text-gray-400'>We offer hassle free exchange policy</p>

        </div>
        <div>

            <div className='flex justify-center'>
                <IoCheckmarkDoneCircle className='text-5xl'/>
            </div>

            <p className='font-semibold'>7 Days Return Policy</p>

            <p className='text-gray-400'>We provide 7 days free return policy</p>

        </div>
        <div>

            <div className='flex justify-center'>
                <SlEarphonesAlt className='text-4xl' />
            </div>

            <p className='font-semibold'>Best customer support</p>

            <p className='text-gray-400'>We provide 24/7 customer support</p>

        </div>

        
        

    </div>
  )
}

export default OurPolicy