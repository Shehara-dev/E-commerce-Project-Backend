import express from 'express'
import { createOrder, getOrders, payhereNotify, updateOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/", createOrder);

// Get orders with pagination
orderRouter.get("/:page/:limit",getOrders);


// PayHere IPN (Instant Payment Notification) endpoint
orderRouter.post("/payhere-notify",payhereNotify);


orderRouter.put("/:orderId",updateOrder)


export default orderRouter;