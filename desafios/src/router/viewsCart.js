import { Router } from "express";
import CartManager from "../dao/mongodb/CartsManager.js";
const Manager = new CartManager("products");
const viewsCartRouter = Router();

viewsCartRouter.get("/", async (req, res) => {
    const products = await Manager.getCart();
    res.render("index", { products });
});

viewsCartRouter.get("/productCart", async (req, res) => {
    
})

viewsCartRouter.get("/cart", async (req, res) => {
    res.render("cart", {});
});


export default viewsCartRouter;