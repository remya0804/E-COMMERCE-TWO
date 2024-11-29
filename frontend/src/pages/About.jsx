import React from 'react'
import Title from '../components/Title'

import about from '../assets/about.jpg'
import NewsLetter from '../components/NewsLetter'

const About = () => {

  return (

    <div>

      <div className='text-2xl text-center pt-8 border-t'>

        <Title  text1={"ABOUT"} text2={"US"}/>

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-14'>

        <img src={about} className='w-full md:max-w-[320px]' alt="" />

        <div className='flex justify-center flex-col gap-6 md:w-2/4 text-gray-600'>

          <p>At Clothique, we believe that fashion is an expression of your unique personality. Our curated collection brings you the latest trends, timeless classics, and everything in between. Whether you’re seeking a chic outfit for a night out, casual essentials for everyday wear, or statement pieces to stand out from the crowd, Clothique has something for everyone.</p>

          <p>We pride ourselves on offering high-quality fabrics, versatile designs, and exceptional customer service. With styles for all occasions and seasons, Clothique is your ultimate destination for fashion-forward looks that make you feel as good as you look.</p>

          <b className='text-gray-800'>Our Misson</b>

          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>


        </div>


      </div>

      <div className='text-4xl py-4 '>

        <Title  text1={"WHY"} text2={"CHOOSE US"}/>
      
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>

        <div className='border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5 '>

          <b>Quality Assurance:</b>

          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>

        </div>
        <div className='border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5 '>

          <b>Convenience:</b>

          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>

        </div>
        <div className='border px-10 py-8 md:px-16 sm:py-20 flex flex-col gap-5 '>

          <b>Exceptional Customer Service:</b>

          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>

        </div>


      </div>

      <NewsLetter />

    </div>
  )
}

export default About