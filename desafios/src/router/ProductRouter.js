import { Router } from "express";
import ProductManager from "../dao/mongodb/ProductManager.js";
import productsModel from "../dao/models/product.model.js";

const productManager = new ProductManager("products")
const productsRouter = Router();


productsRouter.get('/', async (req, res) => {
    try{
        const { page, query, limit, order } = req.query;
        let sortBy;
        if(order === "desc") {
            sortBy = -1;
        } else if (order === "asc"){
            sortBy = 1;
        }
        let products;
        if (!query) {
           
            products = await productsModel.paginate(
                {},
                {
                    limit: limit ?? 10,
                    lean: true,
                    page: page ?? 1,
                    sort: { price: sortBy },
                }
            );
        } else {
            products = await productsModel.paginate(
                { category: query},
                {
                    limit: limit ?? 3,
                    lean: true,
                    page: page ?? 1,
                    sort: { price: sortBy },
                }
            );
        }
        res.render("products", { products, query, order });
        console.log(products)
    }catch(e){
        res.status(502).send({ error: "true" })
        console.log(e);
    }

})
productsRouter.get("/", async (req, res) => {
    
    try {
        const products = await productManager.getProducts();
        console.log(products)
        res.send(products)
    } catch (e) {
        res.status(500).send({ error: true });
    }
});
// GET llamado por id
productsRouter.get("/:pid", async (req, res) => {
    try{
        const { pid } = req.params;
        const product = await productManager.getProductById(pid)
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

productsRouter.post("/", async (req, res) => {
    try{
        const body=req.body
       const result = await productsModel.insertMany([body])
       console.log(result)
    res.send(result)
    }catch(e){
    res.status(502).send({ error: "true" })
    console.log(e);
    }
    
})

// PUT modificar archivos

productsRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = req.body;
        const prod = await productManager.updateProduct(pid, product)  // revisar video para agregar el metodo que corresponde
        res.send(prod , { update: true });
    }catch (e) {
        res.status(500).send({ error: true });
    }
})


// Delete para eliminar objetos
productsRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const prod = await productManager.deleteProductById(pid)
        res.send({ deleted: true, prod });
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

 

export default productsRouter;