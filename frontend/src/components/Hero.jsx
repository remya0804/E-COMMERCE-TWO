import React from 'react'

import hero from '../assets/hero.avif'

const Hero = () => {
  return (

    <div className='flex flex-col sm:flex-row border border-gray-400 '>

        <div className='w-full sm:w-1/2 py-10 sm:py-0 flex items-center justify-center '>

            <div className='text-[#414141]'>

                <div className='flex items-center gap-2'>

                    <p className='w-0 md:w-11 h-[2px] bg-[#414141] '></p>

                    <p className='font-medium text-sm md:text-base '>OUR BESTSELLERS</p>

                </div>

                <h1 className='sm:py-3 text-3xl lg:text-5xl prata-regular leading-relaxed'>Latest Arrivals</h1>

                <div className='flex items-center gap-2'>

                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>

                    <p className='w-0 md:w-11 h-[1px] bg-[#414141] '></p>

                </div>

            </div>

        </div>
        <img className='w-full sm:w-1/2 ' src={hero} alt="" />
        
    </div>
  )
}

export default Hero