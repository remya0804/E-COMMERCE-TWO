import express from 'express'

import {addToCart,getCartData,addQuantity,removeQuantity} from '../controllers/cartController.js'
import authUser from '../middleware/userAuth.js'

const cartRouter = express.Router()

cartRouter.post('/add-to-cart',authUser,addToCart)
cartRouter.post('/add-quantity',authUser,addQuantity)
cartRouter.post('/remove-quantity',authUser,removeQuantity)
cartRouter.post('/get-cart-data',authUser,getCartData)

export default cartRouter

