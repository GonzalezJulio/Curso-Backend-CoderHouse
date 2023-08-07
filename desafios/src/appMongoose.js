import express from 'express';
import mongoose from 'mongoose';
import productsRouter from './router/ProductRouter.js'

const app = express();

const conn = await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
console.log("Conectados en mongoose")
app.use(express.json())

app.use('/api/products', productsRouter)

app.listen(8080,()=>console.log("connectados en 8080"));