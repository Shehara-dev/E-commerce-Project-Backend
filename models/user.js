import mongoose from "mongoose";

const userSchema = new mongoose.Schema( 
    {

        name : {
            type: String,
            required: [true, 'Name is required'],
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        password : {
            type : String,
            required : true
        },
        role: {
            type: String,
            enum: ['Admin', 'Customer'],
            default: 'Customer',
            required: true
        },
    }
)

const User = mongoose.model("users",userSchema)


export default User;