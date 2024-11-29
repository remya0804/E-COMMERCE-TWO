import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useLocation } from 'react-router-dom';


const SearchBar = () => {

   const {search,setSearch,showSearch,setShowSearch}  = useContext(ShopContext);

   const [searchPath,setSearchPath] = useState(false);

   const location = useLocation();

   useEffect(() => {

    if(location.pathname.includes('collection')){

        setSearchPath(true)
    } 
    
    else{
        setSearchPath(false)
    }
   },[location])



  return showSearch && searchPath ? (

    <div className='border-b border-t bg-gray-50 text-center'>

        <div className='w-3/4 sm:w-1/2 inline-flex items-center justify-center  border border-gray-400 px-5 py-2 mx-3 my-5 rounded-full'>

            <input value={search} onChange={(e) => setSearch(e.target.value)} className='w-full outline-none bg-inherit text-sm' type="text" placeholder='Search' />

            <div>

                <IoIosSearch className='text-lg md:text-3xl cursor-pointer '/>

            </div>


        </div>

        <IoClose onClick={() => setShowSearch(false)} className='inline text-lg md:text-3xl cursor-pointer' />
        

    </div>
  )

  : null
}

export default SearchBar