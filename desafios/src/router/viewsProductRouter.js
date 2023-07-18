import { Router } from "express";
import ProductManager from "../ProductManager.js";
const productManager = new ProductManager ('../db/products.json')
const viewsProductRouter = Router();

viewsProductRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("index", { products });
});

viewsProductRouter.get("/productsrealtime", async (req, res) => {
    res.render("productsRealTime", {});
});


export default viewsProductRouter;