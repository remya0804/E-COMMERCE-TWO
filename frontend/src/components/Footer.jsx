import React from 'react'
import { Link } from 'react-router-dom'

import { SiThreads } from "react-icons/si";


const Footer = () => {
  return (
    
    <div>
        <div className='flex flex-col sm:grid grid-cols-[1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm ' >

            <div >

                <Link to='/'>

                    <div className='flex items-center'>

                        <SiThreads className='text-base sm:text-lg md:text-2xl text-pink-500 uppercase' />   
                    
                        <p className='text-base sm:text-lg md:text-2xl text-gray-700 uppercase font-bold'>Clothique</p>
                    
                    </div>

                </Link>

                <p className='text-gray-700 w-full  mt-5'>Clothique is dedicated to bringing you the finest textiles and trendsetting designs, blending quality and style to redefine your wardrobe.</p>

            </div>

            <div>

                <p className='text-xl font-medium mb-5 '>COMPANY</p>

                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>Home</li>
                    <li>About Us </li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>


                </ul>
            </div>
            <div>

                <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>

                <ul className='flex flex-col gap-1 text-gray-600'>

                    <li>+1-000-000-0000</li>
                    <li>clothique@gmail.com </li>
                    <li>Facebook</li>

                </ul>
            </div>

        </div>

        <div>

            <hr />

            <p className='text-center text-sm py-5'>Copyright 2024 @ CLOTHIQUE - All Right Reserved.</p>
        </div>
        

    </div>
  )
}

export default Footer