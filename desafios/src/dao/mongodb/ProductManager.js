
import productsModel from "../models/product.model.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
console.log('Conectado mongoose Manager')


export default class ProductManager {
    constructor () {}
    
    getProducts = async () => {
        try {
            
            const products = await productsModel.find()
            return products;
        } catch(e) {
            return [];
        }
    }

    async addProduct (productAdd) {
        const addProduct = await productsModel.insertMany([productAdd])
        return addProduct;
    }

    async getProductById(idProduct) {
        const product = await productsModel.findOne({ idProduct });
        if(!product) return "Producto no encontrado"
    } 
    

    /* async updateProduct(idProduct, product) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.id == idProduct);
        if (productIndex == -1) return false;

        products[productIndex] = {...products[productIndex], ...product}
        
    }  */ 
    
    
     async deleteProductById(idProduct) {
        const product = await productsModel.findOne({ idProduct })
        return product;
        
    }


}











 