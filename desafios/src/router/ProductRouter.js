import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const productManager = new ProductManager("products");
const productsRouter = Router();



     // GET Llamado de todo los products
productsRouter.get("/api/", async (req, res) => {
    
    try {
        const products = await productManager.getProducts();
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
productsRouter.get("/api/products/:idProduct", async (req, res) => {
    try{
        const { idProduct } = req.params;
        const product = await productManager.getProductById(idProduct)
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

productsRouter.post("/api/products", async (req, res) => {
    
 
    try {
        const body = req.body;
            const prod = await productManager.addProduct(body)
            res.send({ msg: "Producto Agregado", prod });
    
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: true });
        }
    
})

// PUT modificar archivos

productsRouter.put("/api/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = req.body;
        const prod = await productManager.updateProduct(idProduct)  // revisar video para agregar el metodo que corresponde
        res.send({ update: true });
    }catch (e) {
        res.status(500).send({ error: true });
    }
})


// Delete para eliminar objetos
productsRouter.delete("/api/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const prod = await productManager.deleteProductById(idProduct)
        res.send({ deleted: true, prod });
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

 

export default productsRouter;