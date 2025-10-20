import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        require : true
    },
    altName : {
        type : [String],
        default : []
    },
    labelledPrice : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : [String],
        default : ["/default-product.jpg"]
    }
})


const Product = mongoose.model("products",productSchema)

export default Product;