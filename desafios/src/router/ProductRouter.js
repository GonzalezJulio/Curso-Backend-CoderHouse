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
productsRouter.get("/products", async (req, res) => {
    
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
        const product = await productManager.getProductById(idProduct)
        res.send(product)
    } catch (e) {
        res.status(500).send({ error: true });
    }
})

// POST Agregar products

productsRouter.post("/product", async (req, res) => {
    
 
    try {
        const body = req.body;
            const prod = await productsModel.insertMany([body])
            console.log(prod)
            res.send({ msg: "Producto Agregado", prod });
    
        } catch (e) {
            console.log(e);
            res.status(500).send({ error: true });
        }
    
})

// PUT modificar archivos

productsRouter.put("/products/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = req.body;
        const prod = await productManager.updateProduct(idProduct, product)  // revisar video para agregar el metodo que corresponde
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