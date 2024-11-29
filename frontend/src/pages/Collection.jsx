import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

import { MdOutlineArrowDropDown } from "react-icons/md";
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';



const Collection = () => {

  const {productsArray,search,setSearch,showSearch,setShowSearch} = useContext(ShopContext);

  const [showFilter,setShowFilter] = useState(false);

  const [filterArray,setFilterArray] = useState([]);

  const [category,setCategory] = useState([]);

  const [type,setType] = useState([]);

  const [sortValue,setSortValue] = useState("relavent");

  const toggleCategory = (e) => {

    if(category.includes(e.target.value)){

      setCategory(prev => prev.filter((item) => item !== e.target.value))

    } else{

      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleType = (e) => {

    if(type.includes(e.target.value)){

      setType(prev => prev.filter((item) => item !== e.target.value))

    } else{

      setType(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productArrayCopy = productsArray.slice();

    if(search && showSearch){

      productArrayCopy = productArrayCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0) {

      productArrayCopy = productArrayCopy.filter((item) => category.includes(item.category))
    }
    if(type.length > 0) {

      productArrayCopy = productArrayCopy.filter((item) => type.includes(item.type))
    }

    setFilterArray(productArrayCopy);
  }

 const sortFunction = () => {

  const filterArrayCopy = filterArray.slice();

  switch(sortValue) {

    case 'low-high':

      setFilterArray(filterArrayCopy.sort((a,b) => a.price - b.price))

      break;

    case 'high-low':

      setFilterArray(filterArrayCopy.sort((a,b) => b.price - a.price))

      break;

    default:

      applyFilter();

      break;

  }
 }

  useEffect(() => {

   applyFilter();
    
  },[category,type,search,productsArray])

  useEffect(() => {

   sortFunction();
    
  },[sortValue])

  return (

    <div className='pt-10 border-t flex flex-col gap-1 sm:flex-row sm:gap-10 '>

      <div className='min-w-60'>

        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-base sm:text-xl flex items-center gap-1 cursor-pointer'>
          
          FILTERS

          <MdOutlineArrowDropDown className={`-ml-2 text-3xl sm:hidden ${showFilter ?  "rotate-270"  : '-rotate-90'}`}/>
          
        </p>

        {/* category */}

        <div className={`mt-6 py-3 pl-5 border  border-gray-300 sm:block ${showFilter ? '' : "hidden"}`}>

          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>

              <input onChange={(e) => toggleCategory(e)} className='w-3' type="checkbox" value={"Men"} /> Men
              
            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleCategory(e)} className='w-3' type="checkbox" value={"Women"} /> Women

            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleCategory(e)} className='w-3' type="checkbox" value={"Kids"} /> Kids

            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleCategory(e)} className='w-3' type="checkbox" value={"Unisex"} /> Unisex

            </p>


          </div>

        </div>

        {/* type */}

        <div className={`my-6 py-3 pl-5 border border-gray-300 sm:block ${showFilter ? '' : "hidden"}`}>

          <p className='mb-3 text-sm font-medium '>Type</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>

            <p className='flex gap-2'>

              <input onChange={(e) => toggleType(e)}  className='w-3' type="checkbox" value={"Outerwear"} /> Outerwear
              
            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleType(e)} className='w-3' type="checkbox" value={"Casual"} /> Casual 

            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleType(e)} className='w-3' type="checkbox" value={"Formal"} /> Formal

            </p>
            <p className='flex gap-2'>

              <input onChange={(e) => toggleType(e)} className='w-3' type="checkbox" value={"Bohemian"} /> Bohemian

            </p>


          </div>

        </div>


      </div>

      <div className='flex-1'>

        <div className='mb-4 text-2xl'>

          <Title  text1={"ALL"} text2={"COLLECTIONS"}/>

          <div className='text-end'>

            <select onChange={(e) => setSortValue(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>

              <option value="relavent">Sort by: Relavent</option>
              <option value="low-high">Sort by: Low-High</option>
              <option value="high-low">Sort by: High-Low</option>

            </select>
          </div>

        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 '>

          {
            filterArray.map((item,idx) => {

              return <ProductItem key={idx} id={item._id} image={item.images[0]} name={item.name} price={item.price} />
            })
          }
        </div>


      </div>
      
    </div>
  )
}

export default Collection