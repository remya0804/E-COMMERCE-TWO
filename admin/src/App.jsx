import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import AllProducts from './pages/AllProducts'
import Orders from './pages/Orders'
import Login from './components/Login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {

  const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")

  useEffect(() => {

    localStorage.setItem('token',token)

  },[token])


  return (

      <div className='bg-gray-50 min-h-screen'>

        <ToastContainer />

        {

          token === ""

          ? <Login setToken={setToken} />

          : <>

              <Navbar setToken={setToken} />
          
              <hr />
          
              <div className='w-full flex'>
          
                <Sidebar />
          
                <div className='w-[70%]  mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
          
                  <Routes >
          
                    <Route path='/add-product' element={<AddProduct token = {token}/>}/>
                    <Route path='/all-products' element={<AllProducts token = {token}/>}/>
                    <Route path='/orders' element={<Orders token = {token}/>}/>
          
                  </Routes>
          
          
                </div>
          
          
              </div>
              
              </>


        }
    
    

    </div>
  )
}

export default App