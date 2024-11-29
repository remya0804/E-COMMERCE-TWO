import express from 'express'
import { placeOrder,placeOrderStripe,placeOrderRazorpay,getAllOrders,userOrders,updateOrderStatus, verifyStripe} from "../controllers/orderController.js";
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/userAuth.js';

const orderRouter = express.Router();

orderRouter.post('/all-orders',adminAuth,getAllOrders)
orderRouter.post('/update-orders-status',adminAuth,updateOrderStatus)

orderRouter.post('/place-order',authUser,placeOrder)
orderRouter.post('/place-order-stripe',authUser,placeOrderStripe)
orderRouter.post('/verify-stripe',authUser,verifyStripe)
orderRouter.post('/place-order-razorpay',authUser,placeOrderRazorpay)
orderRouter.post('/user-orders',authUser,userOrders)

export default orderRouter

