import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { upload } from "../config/multer.js";
import productsModel from "../schemas/product.model.js";


const productManager = new ProductManager("products");
const productsRouter = Router();



// GET Llamado de todo los products
productsRouter.get("/api/", async (req, res) => {
    const { title } = req.query;
    res.render("index", {nombre: title})
    try {
        const products = await productsModel.find(title);
      
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
productsRouter.get("/api/:idProduct", async (req, res) => {
    try{
        const { idProduct } = req.params;
        const product = await productsModel.find(idProduct);
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

productsRouter.post("/api/products", upload.single('thumbnail'), async (req, res) => {
    const body = req.body;
 
    try {
            if(req.file.filemane) return res.send("Archivo no se ha encontrado!")
            body.thumbnail = req.file.filemane;
            const result = await productsModel.insertMany(body);
           
            res.send(result);
            console.log("producto agregado")
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: true });
        }
    
})

// PUT modificar archivos

/* productsRouter.put("/:idProduct", async (req, res) => {
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
}) */

export default productsRouter;