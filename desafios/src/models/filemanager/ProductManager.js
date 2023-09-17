import productsModel from "../schemas/product.model.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)

export default class ProductManager {
    
    constructor () {}
    
    async getProducts() {
        let products = await productsModel.find().lean();
        return products
    }

    

    async addProduct (product) {
        try{
            const producto = await productsModel.insertMany([product])
            console.log(producto)  
            return producto
        }
        catch{(e)=>{
            console.log("Hubo un error en el ingreso de datos")
        } }
    };
    
    async getProductById (pid) {
        try {
            let foundProduct = await productsModel.findOne({_id: pid})
            if(!foundProduct) return { status: 'failed', message: `Product ${pid} no encontrado ` }
            return foundProduct

        } catch(error) {
            console.log(`error: ${error}`)
        }
    }
    

    async updateProduct(id, newData) {
        let foundProduct = await productsModel.findOne({ _id: id })
        let updatedProperties = {}
        if (newData.title) {
            await foundProduct.updateOne({$set: {title: newData.title } })
            updatedProperties['title'] = newData.title
        };
        if (newData.description) {
            await foundProduct.updateOne({$set: { description: newData.description } })
            updatedProperties['description'] = newData.description
        };
        if(newData.price) {
            await foundProduct.updateOne({$set: { price: newData.price } })
            updatedProperties['price'] = newData.price
        };
        if(newData.thumbnail) {
            await foundProduct.updateOne({ $set: { code: newData.code} })
            updatedProperties['thumbnail'] = newData.thumbnail
        }
        if (newData.code) {
            await foundProduct.updateOne({ $set: { code: newData.code } })
            updatedProperties['code'] = newData.code
        };
        if (newData.stock) {
            await foundProduct.updateOne({ $set: { stock: newData.stock } })
            updatedProperties['stock'] = newData.stock

        };
        return { status: 'Success', message: 'Product modified.', payload: updatedProperties }
    } 
    
    
     async deleteProductById(id) {
        try {
            await productsModel.deleteOne({ _id: id });
            return { status: 'Success.', message: `Product ${id} deleted.` };
        } catch (error) { return { status: 'Error', message: error.message } }
        
    }


}











 