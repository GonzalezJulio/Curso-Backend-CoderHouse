import productsModel from "../models/product.model.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)

export default class ProductManager {
    
    constructor () {}
    
    async getProducts() {
        let products = await productsModel.find().lean();
        return products
    }

    async generateNewCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomCode = '';
        for(let i = 0; i < 7; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomCode += characters[randomIndex];
        }
        return randomCode
    }

    async addProduct (product) {
        product.code = await this.generateNewCode()
        try {
            await productsModel.create(product);
            return ({ stauts: 'Success', message: 'Producto Agregado', payload: product })
    } catch(e){
        console.log((e) => "Error al cargar Productos")

    }
    };
    
    async getProductById (pid) {
        try {
            let foundProduct = await productsModel.findById(pid)
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











 