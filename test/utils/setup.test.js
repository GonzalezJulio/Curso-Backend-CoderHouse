import mongoose from "mongoose";
import productModel from "../../src/models/schemas/product.model.js";   
import cartsModel from "../../src/models/schemas/carts.schemas.js"
import userModel from "../../src/models/schemas/user.model.js"
import 'dotenv/config'


export const connectTestDatabase = async () => {
await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspjOlivia@lasgonzaleztienda.jyrtdk6.mongodb.net1/lasgonzaleztienda`)
}

export const disconnectTestDatabase = async () => {
    mongoose.connection.close()
}

export const dropProducts = async () => {
    await productModel.collection.drop()
}

export const dropCarts = async () => {
    await cartsModel.collection.drop()
}

export const dropUsers = async () => {
    await userModel.collection.drop()
}