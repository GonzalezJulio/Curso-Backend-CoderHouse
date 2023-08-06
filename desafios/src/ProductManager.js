import fs from "fs/promises"
import productsModel from "./schemas/product.model.js";
import mongoose from "mongoose";
export default class ProductManager {
    

    constructor () {}

    /* async #saveProduct(products) {
        await fs.writeFile(this.path, JSON.stringify(products))
        this.products = products;
        return products
    } */

    getProducts = async () => {
        try {
            
            const products = await productsModel.find()
            return products;
        } catch(e) {
            return [];
        }
    }

    addProduct = async (productAdd) => {
       
        try {
            productsModel.create(productAdd)
            const addProduct = await productsModel.insertMany([productAdd])
            return addProduct;

        }catch(e){
            console.log(e)

        }

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
        await this.#saveProduct(products)
    }  */
    
    
    /* async deleteProductById(idProduct) {
        const products = await this.getProducts();
        const newProducts = products.filter(product => product.id != idProduct);
        await this.#saveProduct(newProducts); 
    } */


}











 