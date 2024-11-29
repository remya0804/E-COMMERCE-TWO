import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Login from './pages/Login'
import Product from './pages/Product'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyStripe from './pages/VerifyStripe'

const App = () => {
  return (
    
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <Navbar />

      <SearchBar />

      <ToastContainer />

      <Routes>

        <Route path='/' element = {<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/collection' element = {<Collection />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/cart' element = {<Cart />} />
        <Route path='/orders' element = {<Orders />} />
        <Route path='/place-order' element = {<PlaceOrder />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/product/:productId' element = {<Product />} />
        <Route path='/verify-stripe' element = {<VerifyStripe />} />

      </Routes>

      <Footer />
      {/* // "react-axios": "^2.0.6", */}


    </div>
  )
}

export default App