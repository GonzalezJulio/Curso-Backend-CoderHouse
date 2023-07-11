import { Router } from "express";
import ProductManager from "../ProductManager.js";

const productManager = new ProductManager("products");
const productsRouter = Router();



// GET Llamado de todo los products
productsRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
productsRouter.get("/:idProduct", async (req, res) => {
    try{
        const { idProduct } = req.params;
        const product = await productManager.getProductById(idProduct);
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

productsRouter.post("/", async (req, res) => {
    const body = req.body;
    try {
            const result = await productManager.addProduct(body);
            res.send(result);
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: true });
        }
    
})

// PUT modificar archivos

productsRouter.put("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = req.body;
        const result = await productManager.updateProduct(idProduct, product);
        res.send({ update: true });
    }catch (e) {
        res.status(500).send({ error: true });
    }
})


// Delete para eliminar objetos
productsRouter.delete("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        await productManager.deleteProductById(idProduct);
        res.send({ deleted: true });
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

export default productsRouter;