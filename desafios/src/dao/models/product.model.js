import mongoose from "mongoose";



const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    description: {
        type: String,
        requider: true,
    },
    price: {
        type: Number,
        requider: true,
    },
    thumbnail: {
        type: String,
        requider: true,
    },
    category: {
        type: String,
        requider: true,
    },
    code: {
        type: String,
        requider: true,
    },
    stock: {
        type: Number,
        requider: true,
    },
});

const productsModel = mongoose.model( "products", productsSchema)
export default productsModel