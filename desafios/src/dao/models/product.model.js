import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"

const collectionName = 'products'

const productsSchema = new mongoose.Schema({
   
    title:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type: String,
        
    },
    code:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    
});

productsSchema.plugin(paginate)
const productModel = mongoose.model(collectionName, productsSchema)

export default productModel 