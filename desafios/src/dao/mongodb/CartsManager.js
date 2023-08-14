import fs from "fs/promises";
import mongoose from "mongoose";
import cartModel from "../models/carts.schemas.js";


mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)



export default class CartManager {
    constructor () {}
    async getCart() {
        try {
            const Carts = await cartModel.find()
            if(!Carts.length) return { response: "Carrito no encontrado"}
            const cart = cartModel.map(cart => ({ id: cart._id, products: Carts.products}))
            console.log("carrito",cart)
            this.cart = cart;
            return this.cart;
        }catch (e) {
            console.log(`error: ${error}`)
        }
    }

    async createCart() {
      
        try{
            const cartNew = await cartModel.create({ products: [] })
            return cartNew;
        } catch(e){
            console.log("Carrito No creado")

        }
      }
      

      async getCartById(id) {
       try {
        const cart = await cartModel
        .findByid(id)
        .populate("products.product")
        .lean();
        if(cart) {
            return cart
        } else {
            return "No encontrado"
        }

       } catch (e) {
        console.log("Error al buscar carrito")

       }
      }

      async addProductToCart(idCart, prodId){
        try{
            const product = await productsModel.findById(prodId)
            const cart = await cartModel.findById(idCart)
            if(!cart){return "No se encontro carrito"
        } else if(!product) {
            return "No se encuentra Producto"
        }

        const index = cart.products.findIndex((prod) => prod.product === prodId)
        if(index != -1) {cart.products[index].quantity++
        } else {
            const productNew = {product: prodId, quantity: 1 }
            cart.products.insertMany(productNew)
        }
        await cart.save();
        return cart;
         } catch(e){ 
            throw new Error("Error al agregar carrito/ producto")

        }
      }

      async deleteCart(id){
        try{
            const cart = await cartModel.find({_id: id})
            await cartModel.deleteOne({_id: id})
 
        }catch(e){

        }
      }
}