
import productsModel from "../models/product.model.js";
import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)

export default class ProductManager {
    constructor (path) {
        this.path = path
    }
    
    getProducts = async () => {
        try {
            
            const products = await productsModel.find()
            this.products = products;
            return this.products;
        } catch(e) {
         console.log(e)
        }
    }

    async addProduct (product) {
        try {
            const producto = await productsModel.insertMany([product])
        console.log(producto)
        return producto;
    } catch(e){
        console.log((e) => "Error al cargar Productos")

    }
    };
    
    async getProductById (productId) {
        try {
            const product = await productsModel.findById(productId)
            if(!product) return { status: 404, response: "Producto no encontrado"} 
            return {response: product}

        } catch(error) {
            console.log(`error: ${error}`)
        }
    }
    

    async updateProduct(id, obj) {
        try{
            const indexProduct = await productsModel.findById(id)
            if(!indexProduct) return {response: "Producto no encontrado"}
            const productData = index._doc
            console.log(productData)
            const updatedProduct = {
                ...productData,
                ...obj
            }
            await productsModel.updateOne({_id: id}. updateProduct)
            return {response: "producto actualizado"}


        }catch(error){
            console.log(`error: ${error}`)
        }
    } 
    
    
     async deleteProductById(deleteId) {
        try{
            const products = await productsModel.findByIdAndDelete(deleteId)
            const listaNueva = await productsModel.find()
            this.products = listaNueva;
            return this.products;

        }catch (e){
            console.log(e)
        }
        
    }


}











 