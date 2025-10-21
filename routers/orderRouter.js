import express from 'express'
import { createOrder, getOrders } from '../controllers/orderController.js';


const orderRouter = express.Router();

orderRouter.post("/", createOrder);

// Get orders with pagination
orderRouter.get("/:page/:limit",getOrders);


// PayHere IPN (Instant Payment Notification) endpoint
orderRouter.post("/payhere-notify", payhereNotify);





export default orderRouter;