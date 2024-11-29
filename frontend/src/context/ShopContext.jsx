import { createContext, useEffect, useState } from "react";
// import { productsArray } from "../assets/assets";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';

    const delivery_fee = 10;

    const [productsArray,setProductsArray] = useState([])
    const [token,setToken] = useState("")
    const navigate = useNavigate()

    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);

    const [cartItems,setCartItems] = useState({});

    const backend_url = import.meta.env.VITE_BACKEND_URL

    const getProductsfromDb = async () => {

        try {

            const response = await axios.get(backend_url + '/api/product/all-product')
            if(response.data.success){

                setProductsArray(response.data.allProducts)
            } else{

                toast.error(response.data.message)
            }
            
        } catch (error) {

            console.log(error);
            
            
        }


    }

    
    useEffect(() => {

        getProductsfromDb()
    } ,[])

    useEffect(() => {

        if(!token && localStorage.getItem('token')) {

            setToken(localStorage.getItem('token'))

            getCartDataDb(localStorage.getItem('token'))

            getCartCount()
        }
    },[])

    const addToCart = async (id,size) => {

        let cartItemsCopy = structuredClone(cartItems);

        if(!size){

            toast.error("Select size");
            return;
        }

        if(cartItemsCopy[id]){

            if(cartItemsCopy[id][size]){

                cartItemsCopy[id][size] += 1;
            }

            else{

                cartItemsCopy[id][size] = 1;
            }
        }

        else{

            cartItemsCopy[id]={};
            cartItemsCopy[id][size] = 1
        }

        setCartItems(cartItemsCopy);

        if(token){

            try {

                await axios.post(backend_url + '/api/cart/add-to-cart',{id,size},{headers:{token}})
                
            } catch (error) {

                console.log(error);

                toast.error(error.message)
                
                
            }
        }


    }

    console.log(cartItems);


    

    const getCartCount = () => {

        let totalCount = 0;

        for(const i in cartItems){

            for(const j in cartItems[i]){

                try {

                    if(cartItems[i][j] > 0){

                        totalCount += cartItems[i][j]
                    }
                    
                } catch (error) {

                    
                    
                }
            }
        }

        return totalCount;
    }


    const addQuantity = async (id,size,quantity) => {

        let cartItemsCopy = structuredClone(cartItems);
      
        cartItemsCopy[id][size] = quantity+1;
      
        setCartItems(cartItemsCopy)

        if(token){

            try {

                await axios.post(backend_url + '/api/cart/add-quantity',{id,size,quantity},{headers:{token}})
                
            } catch (error) {

                console.log(error);

                toast.error(error.message)


                
            }
        }
        
      
      }

      
      
    const removeQuantity = async (id,size,quantity) => {

        let cartItemsCopy = structuredClone(cartItems);
      
        cartItemsCopy[id][size] = quantity-1;
      
        setCartItems(cartItemsCopy)

        if(token){

            try {

                await axios.post(backend_url + '/api/cart/remove-quantity',{id,size,quantity},{headers:{token}})
                
            } catch (error) {

                console.log(error);

                toast.error(error.message)


                
            }
        }
        
      
      }

      const getCartTotal =  () => {

        let cartTotal = 0;

        for(const i in cartItems){

            let productInfo = productsArray.find((p) => p._id == i);

            for(const j in cartItems[i]){

                try {

                    if(cartItems[i][j] > 0){

                        cartTotal += productInfo.price * cartItems[i][j]
                    }
                    
                } catch (error) {
                    
                }
            }

            
        }

            return cartTotal
      }

      const getCartDataDb = async (token) => {

        try {

            const response = await axios.post(backend_url + '/api/cart/get-cart-data',{},{headers:{token}})

            if(response.data.success){

                setCartItems(response.data.cartData)
            }
            
        } catch (error) {

            console.log(error);

            toast.error(error.message)
            
        }


      }


    const value = {

        productsArray,
        currency,
        delivery_fee,
        search,setSearch,
        showSearch,setShowSearch,
        cartItems,setCartItems,
        addToCart,
        getCartCount,
        addQuantity,removeQuantity,
        getCartTotal,
        backend_url,
        token,setToken,
        navigate
        
    }

    return (

        <ShopContext.Provider value={value}>

            {props.children}


        </ShopContext.Provider>
    )
}

export default ShopContextProvider