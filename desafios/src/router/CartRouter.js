import { Router } from "express"; 
import CartManager from "../CartsManager.js";

const cartManager = new CartManager("carts");
const cartRouter = Router();
// Crea Carrito
cartRouter.post("/", async(req, res) => {
    const body = req.body;
    try{
        const result = await cartManager.createCart(body);
        res.send(result);

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: true });
    }
})

//  Devuelve Carrito
cartRouter.get("/:idCart", async (req, res) => {
    try{
        const { idCart } = req.params;
        const cart = await cartManager.getCartById(idCart);
        res.send(cart)
    }catch(e) {
        res.status(500).send({ error: true });
    }
})

//agregar producto al id del carrito
cartRouter.post("/:idCart/products/:idProduct", async(req, res) => {
    
    try{
        const { idCart, idProduct } = req.params;
        const result = await cartManager.addProductToCart(idProduct, idCart);
        res.send(result);

    } catch (e) {
        
        res.status(500).send({ error: true });
    }
})

export default cartRouter;