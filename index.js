import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";
import cors from 'cors';

dotenv.config();


const app = express()

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(bodyParser.json());



// authentication middleware
app.use((req, res, next) => {
  const value = req.header("Authorization");

  if (value != null) {
    const token = value.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET , (err, decoded) => {
      if (err) {
        // invalid token
        return res.status(401).json({
          message: "Unauthorized User",
        });
      } else {
        // valid token
        req.user = decoded;
        next();
      }
    });
  } else {
    // no token provided
    next();
  }
});



const connectionString = process.env.MONGO_URI

mongoose.connect(connectionString).then(
    () => {
        console.log("Connected to Database")
        }
    ).catch(
    () => {
        console.log("Connection Failed")
    })




app.use("/api/user",userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)




app.listen(5000, ()=>{
    console.log("Server Started")
})
