import express from 'express'
import { createOrder, getOrders, payhereNotify, updateOrder } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/:page/:limit",getOrders); // Get orders with pagination
orderRouter.post("/payhere-notify",payhereNotify); // PayHere IPN (Instant Payment Notification) endpoint
orderRouter.put("/:orderId",updateOrder)


export default orderRouter;