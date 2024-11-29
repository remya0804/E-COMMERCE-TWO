import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [loginState,setLoginState] = useState('Login');

  const {token,setToken,backend_url,navigate} = useContext(ShopContext);
  
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      if(loginState== "Sign Up"){

        const response = await axios.post(backend_url + '/api/user/register',{name,email,password})

        if(response.data.success){

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)
        } else{

          toast.error(response.data.message)
        }


      } else{

        const response = await axios.post(backend_url + '/api/user/login',{email,password})

        if(response.data.success){

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)

        } else {

          toast.error(response.data.message)
        }
      }
      
    } catch (error) {

      console.log(error);
      
      
    }

  }


  useEffect(() => {

    if(token){

      navigate('/')
    }


  },[token])


  return (

    <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col items-center gap-4 w-full sm:max-w-96 m-auto mt-14 text-gray-700'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>

        <p className='prata-regular text-3xl '> {loginState}     </p>

        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />


      </div>

      {
        loginState === 'Login' 
        
        ? ""

        :<input onChange={(e) => setName(e.target.value)} value={name}  type="text" className='w-full px-3 py-2 border border-gray-800' required placeholder='Name'/>
      }

      
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' required placeholder='Email'/>
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' required placeholder='Password'/>

      <div className='w-full flex justify-between text-sm mt-[8px]'>

        <p className='cursor-pointer'> Forgot your password?</p>

        {

          loginState === 'Login'

          ? <p onClick={() => setLoginState('Sign Up')} className='cursor-pointer underline text-blue-600'> Create new account </p>
          : <p onClick={() => setLoginState('Login')} className='cursor-pointer underline text-blue-600'> Login here </p>
        }


      </div>

      <button  className='bg-black text-white font-light px-8 py-2 mt-4'>{loginState === 'Login' ? 'Login' : "Sign Up"} </button>


    </form>
  )
}

export default Login