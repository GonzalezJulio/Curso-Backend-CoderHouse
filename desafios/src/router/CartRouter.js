import { Router } from "express"; 
import CartManager from "../dao/mongodb/CartsManager.js";
import ProductManager from "../dao/mongodb/ProductManager.js";
const cartManager = new CartManager("carts");
const productManager = new ProductManager("products")
const cartRouter = Router();


cartRouter.get("/", async (req, res) => {
    try{
        
        const result = await cartManager.getCart();
        res.send(result)
    }catch(e) {
        res.status(502).send({ error: true });
    }
})

cartRouter.post("/", async (req, res) => {
    try{
        const products = req.body;
        const result = await cartManager.createCart(products);
        res.send(result);
        

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: true });
    }
})

cartRouter.get('/:cartId', async(req, res) => {
    try{
        const CartID = req.params.cartId;
        const cart = await cartManager.getProductById(CartID)
        const products = cart.products;
        const id = cart._id
        res.render("cart", { products,id})
    }catch(e){
        res.status(502).send({ error: "Numero de producto incorrecto" });   
    }
})

cartRouter.delete("/:cartId/product/:productId", async (req, res) => {
    const cartId = req.params.cartId;
    const productId = req.params.productId;
    const deleteP = await cartManager.deleteProdFromCart(cartId, productId)
    res.send(deleteP)

})

cartRouter.delete("/:cartId", async (res, req) => {
    const cartId = req.params.cartId;
    const deleteCart = await cartManager.cartCarrito(cartId);
    res.send(deleteCart)
})

cartRouter.put("/:cartId", async (req, res) => {
    const cartId = req.params.cartId
    const product = req.body
    const updatedCart = await cartManager.updateCart(cartId, product);
    res.send(updatedCart)
})

cartRouter.post("/:cartId/product/:productId", async (req, res) => {
    const cid = req.params.cartId;
    const pid = req.params.productId;
    const quantity = req.body.quantity;
    const update = await cartManager.cartQuantity(cid, pid, quantity)
    res.send(update)

})
/*  cartRouter.post("/:cartId/product/:productId", async (req, res) =>{
    try{
        const cid = req.params.cartId
        const pid = req.params.productId
        const cartProd = await cartManager.addProductToCart(cid, pid)
        console.log(cid, pid)
        res.send(cartProd)
    }catch (e) {
        console.log(e)
    }

 }) */
export default cartRouter;