import express from 'express'
import adminAuth from '../config/middleware/adminAuth.js'
import authUser from '../config/middleware/auth.js'

// 🔹 FIXED PATH HERE
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay
} from '../controllers/orderController.js'

const orderRouter = express.Router()

// admin features
orderRouter.post('/list', adminAuth, allOrders) // "/" in 'list'
orderRouter.post('/status', adminAuth, updateStatus)

// payment feature
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user feature
orderRouter.post('/userorders', authUser, userOrders)
// verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)

export default orderRouter
