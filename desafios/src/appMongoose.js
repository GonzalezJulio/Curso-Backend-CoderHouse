import express from 'express';
import mongoose from 'mongoose';
import productsModel from './schemas/product.model.js';
import ProductRouter from './router/ProductRouter.js'

const app = express();

const conn = await mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)


app.use(express.json())
app.use("/api/products", ProductRouter)
/* 
    // GET Llamado de todo los products
app.get("/api/products", async (req, res) => {
    
    try {
        const products = await productsModel.find();
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
app.get("/api/products/:idProduct", async (req, res) => {
    try{
        const { idProduct } = req.params;
        const product = await productsModel.find(idProduct)
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

app.post("/api/products", async (req, res) => {
    
 
    try {
        const body = req.body;
            const prod = await productsModel.insertMany([body])
            res.send({ msg: "Producto Agregado", prod });
    
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: true });
        }
    
})

// PUT modificar archivos

app.put("/api/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = req.body;
        const prod = await productsModel.insertMany()  // revisar video para agregar el metodo que corresponde
        res.send({ update: true });
    }catch (e) {
        res.status(500).send({ error: true });
    }
})


// Delete para eliminar objetos
app.delete("/api/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const prod = await productsModel.insertMany()
        res.send({ deleted: true, prod });
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

 */




app.listen(8080,()=>console.log("connectados en 8080"));