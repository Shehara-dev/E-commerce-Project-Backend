import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";


const app = express()

app.use(bodyParser.json());

const connectionString = "mongodb+srv://admin:123@cluster0.vukhw1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(connectionString).then(
    () => {
        console.log("Connected to Database")
        }
    ).catch(
    () => {
        console.log("Connection Failed")
    })



app.listen(5000, ()=>{
    console.log("Server Started")
})
