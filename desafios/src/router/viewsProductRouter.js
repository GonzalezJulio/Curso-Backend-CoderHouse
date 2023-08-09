import { Router } from "express";
import ProductManager from "../dao/mongodb/ProductManager.js";
const productManager = new ProductManager("products");
const viewsProductRouter = Router();

viewsProductRouter.get("/", async (req, res) => {
    const products = await productManager.getProducts();
    res.render("index", { products });
});

viewsProductRouter.get("/productsrealtime", async (req, res) => {
    res.render("productsRealTime", {});
});


export default viewsProductRouter;