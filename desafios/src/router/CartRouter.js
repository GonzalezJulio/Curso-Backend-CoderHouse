import { Router } from "express"; 
import CartManager from "../CartsManager.js";

const cartManager = new CartManager("../db/carts.json");
const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
    try{
        const cart = await cartManager.getCart();
        res.send(cart)
    }catch(e) {
        res.status(502).send({ error: true })
    }
})

cartRouter.post("/", async(req, res) => {
    const body = req.body;
    try{
        const result = await cartManager.addCart(body);
        res.send(result);

    } catch (e) {
        console.log(e);
        res.status(502).send({ error: true });
    }
})



export default cartRouter;