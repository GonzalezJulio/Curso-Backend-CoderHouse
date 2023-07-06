import express from "express";
import ProductManager from "./ProductManager.js"
const productManager = new ProductManager("products")


const app = express()

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.get("/products", async (req, res) => {
    try {
        const product = await productManager.getProducts();
        res.send(product)
    } catch(e) {
        res.status(502).send({ error: true })
    }
});

// * POST
app.post("/products", async (req, res) => {
    const body = req.body;
    if (!nody.title || !body.description || !body.price) {
        res.send({ error:  true, msg: "Contendio faltante" });
    } else {
        try {
            const result = await productManager.addProduct(body);
            res.send(result);
        } catch (e) {
            console.log(e);
            res,status(502).send({ error: true });
        }
    }
})

app.put("/products", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = req.body;
        const result = await productManager.updateProduct(idProduct, evento);
        res.send({ update: true });
    }catch (e) {
        res.status(502).send({ error: true });
    }
})

app.get("/products/:id", async (req, res) => {
    try{
        const { idProduct } = req.params;
        const product = await productManager.getProductById(idProduct);
        res.send(product)
    } catch (e) {
        res.status(502).send({ error: true });
    }
})

app.delete("/product/:id", async (req, res) => {
    try {
        const { idProduct } = req.params;
        await productManager.deleteProductById(idProduct);
        res.send({ deleted: true });
    } catch (e) {
        res.status(502).send({ error: true });
    }
})

app.listen(8080, () => {
    console.log("Conectados!");
});