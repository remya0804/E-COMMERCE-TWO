import axios from 'axios';
import React, { useState } from 'react'

import { LuImagePlus } from "react-icons/lu";
import { backend_url } from '../App';
import { toast } from 'react-toastify';

const AddProduct = ({token}) => {

  const [image1,setImage1] = useState(false)
  const [image2,setImage2] = useState(false)
  const [image3,setImage3] = useState(false)
  const [image4,setImage4] = useState(false)

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("Men")
  const [type,setType] = useState("Casual")
  const [bestSeller,setBestSeller] = useState(false)
  const [size,setSize] = useState([])

  const onSubmitHandler = async (e) => {

      e.preventDefault();

      try {

        const formData = new FormData()

        formData.append("name",name)
        formData.append("description",description)
        formData.append("price",price)
        formData.append("category",category)
        formData.append("type",type)
        formData.append("bestSeller",bestSeller)

        formData.append("sizes",JSON.stringify(size))

        image1 && formData.append("image1",image1)
        image2 && formData.append("image2",image2)
        image3 && formData.append("image3",image3)
        image4 && formData.append("image4",image4)

        const response = await axios.post(backend_url + '/api/product/add-product',formData,{headers:{token}})

        if(response.data.success){

          toast.success(response.data.message)

          setName("")
          setDescription("")
          setCategory("Men")
          setType("Casual")
          setPrice("00.00")
          setImage1(false)
          setImage2(false)
          setImage3(false)
          setImage4(false)
        }
        
        
      } catch (error) {

        console.log(error.message)
        
      }


  }

  

  return (

    <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col w-full items-start'>

      <div>

        <p>Upload Image</p>
        

        <div className='flex gap-4'>

          <label htmlFor="image1" className='mt-2'>

            <div>
              {
                !image1

                ? <LuImagePlus className='text-3xl  text-gray-400'/>
                : <img className='w-24 h-[100px]' src={URL.createObjectURL(image1)} alt="" /> 
              }

              
            </div>

            
            <input onChange = {(e) => setImage1(e.target.files[0])} type="file"  id="image1" hidden/>

          </label>

          <label htmlFor="image2" className='mt-2'>

            <div>
              {
                !image2

                ? <LuImagePlus className='text-3xl  text-gray-400'/>
                : <img className='w-24 h-[100px]' src={URL.createObjectURL(image2)} alt="" /> 
              }

              
            </div>

            <input onChange = {(e) => setImage2(e.target.files[0])} type="file"  id="image2" hidden/>

          </label>

          <label htmlFor="image3" className='mt-2'>

              <div>
                {
                  !image3

                  ? <LuImagePlus className='text-3xl  text-gray-400'/>
                  : <img className='w-24 h-[100px]' src={URL.createObjectURL(image3)} alt="" /> 
                }

                
              </div>
              <input onChange = {(e) => setImage3(e.target.files[0])} type="file"  id="image3" hidden/>

          </label>

          <label htmlFor="image4" className='mt-2'>

            <div>
                {
                  !image4

                  ? <LuImagePlus className='text-3xl  text-gray-400'/>
                  : <img className='w-24 h-[100px]' src={URL.createObjectURL(image4)} alt="" /> 
                }

                
            </div>            
              
            <input onChange = {(e) => setImage4(e.target.files[0])} type="file"  id="image4" hidden/>

          </label>

        </div>

      </div>

      <div className='w-full mt-5'>

        <p className='mb-2'>Product Name</p>

        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here ' required />
      </div>
      <div className='w-full mt-5'>

        <p className='mb-2'>Product Description</p>

        <textarea onChange={(e) => setDescription(e.target.value)} value={description}  className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

        <div className='mt-3'>

          <p className='mb-2'>Product Category</p>

          <select onChange={(e) => setCategory(e.target.value)}  className='w-full px-3 py-2' name="" id="">

            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>

          </select>
        </div>


        <div className='mt-3'>

          <p className='mb-2'>Product Type</p>

          <select onChange={(e) => setType(e.target.value)} className='w-full px-3 py-2' name="" id="">

            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Party Wear">Party Wear</option>
            <option value="Outerwear">Outerwear</option>

          </select>
        </div>

        <div className='mt-3'>

          <p  className='mb-2'>Product Price</p>

          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='00.00' />
        </div>

      </div>

      <div className='mt-3'>

        <p className='mb-2'>Product Sizes</p>

        <div className='flex gap-3'>

          <div className={`${size.includes("S") ? "bg-[#f7c1ca]" : "bg-slate-200"}`} onClick={() => setSize(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev,"S"])}>

            <p className='px-3 py-1 cursor-pointer'>S</p>
            
          </div>
          <div className={`${size.includes("M") ? "bg-[#f7c1ca]" : "bg-slate-200"}`} onClick={() => setSize(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev,"M"])}>

            <p className='px-3 py-1 cursor-pointer'>M</p>

          </div>
          <div className={`${size.includes("L") ? "bg-[#f7c1ca]" : "bg-slate-200"}`} onClick={() => setSize(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev,"L"])}>

            <p className=' px-3 py-1 cursor-pointer'>L</p>

          </div>
          <div className={`${size.includes("XL") ? "bg-[#f7c1ca]" : "bg-slate-200"}`} onClick={() => setSize(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev,"XL"])}>

            <p className='px-3 py-1 cursor-pointer'>XL</p>

          </div>


        </div>

        <div className='flex gap-2 mt-4'>

          <input onChange={() => setBestSeller(prev => !prev)} type="checkbox" id="bestSeller"  checked={bestSeller}/>
          <label className='cursor-pointer' htmlFor="bestSeller">Add to Best Seller</label>
        </div>

        <button className='w-28 py-2 mt-4 bg-black text-white' type='submit'>ADD</button>


      </div>



    </form>
  )
}

export default AddProduct