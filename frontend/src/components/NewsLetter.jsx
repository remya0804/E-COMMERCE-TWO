import React from 'react'

const NewsLetter = () => {

    const onSubmitHandler = () => {

        e.preventDefault();
    }

  return (
    <div className='text-center'>

        <p className='text-2xl font-medium text-gray-800'>

            Subscribe now & get 20% off
        </p>

        <p className='mt-3 text-gray-400'>

            Stay Updated with the Latest Trends and Exclusive Offers – Subscribe to Our Newsletter Today!
        </p>

        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 pl-3 border '>

            <input className='w-full sm:flex-1 outline-none' type="email" required placeholder='Enter your email' />

            <button onClick={(e) => onSubmitHandler(e)} className='bg-black text-sm text-white px-8 py-3' type='submit'> SUBSCRIBE</button>
            
        </form>
        

    </div>
  )
}

export default NewsLetter