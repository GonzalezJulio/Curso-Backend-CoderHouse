import express from 'express';
import mongoose from 'mongoose';
import productsModel from './schemas/product.schemas.js';
const app = express();

const connect = mongoose.connect(`mongodb+srv://aresden113:AB2ZAspj18@lasgonzaleztienda.jyrtdk6.mongodb.net/lasgonzaleztienda`)
connect.then(() => console.log('Contecado mongoose'))
productsModel.insertMany

app.use(express.json())

app.get("/api/products", async (req, res) => {
    // GET Llamado de todo los products
app.get("/", async (req, res) => {
    
    try {
        const products = await productManager.getProducts();
      
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
app.get("/api/products/:idProduct", async (req, res) => {
    try{
        const { idProduct } = req.params;
        
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

app.post("/api/", async (req, res) => {
    const body = req.body;
 
    try {
          
            productsModel.insertMany([body])
            res.send({ msg: "Producto Agregado" });
    
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
        
        res.send({ update: true });
    }catch (e) {
        res.status(500).send({ error: true });
    }
})


// Delete para eliminar objetos
app.delete("/api/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        
        res.send({ deleted: true });
    } catch (e) {
        res.status(500).send({ error: true });
    }
})




}); 

app.listen(8080,()=>console.log("connectados en 8080"));