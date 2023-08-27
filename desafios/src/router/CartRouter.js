import { Router } from "express"; 
import CartManager from "../dao/mongodb/CartsManager.js"
const cartManager = new CartManager();
const cartRouter = Router()


cartRouter.get("/", async (req, res) => {
   const cart = await cartManager.getCart()
   if (cart.length <= 0) {
    res.send({ status: 'Error', message: 'No exite carrito'})
   } else {
    res.send(cart)
   }
})

cartRouter.post("/", async (req, res) => {
    try{
        const carts = await cartManager.getCart()
        if(carts.length <= 0) {
            await cartManager.createCart()
            console.log("No se encontro ningun carrito en la DB, se creo uno nuevo")
            res.send({ status: "Ok", message: "Carrito creado." })
        } else {
            await cartManager.createCart()
            res.send({ status: "OK", message: "Carrito creado"})
        }
    
    } catch (error) {
        console.log(`Fallo la ruta, revisar ${error.message}`);
        res.status(500).send({ status: "error", message: error.message });
    }
})

cartRouter.get('/:cid', async(req, res) => {
    const cid = req.params.cid;
    const foundCart = await cartManager.getCartById(cid)
    if( foundCart) {
        res.send(foundCart)
    } else {
        res.send({ error: `Cart/cid fallo, no encontrado`})
    }
})

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cartManager.addProductToCart(cid, pid)
    res.send(result)
})

cartRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const newProducts = req.body
    const result = await cartManager.updateCartProducts(cid, newProducts)
    res.send(result)
})

cartRouter.put('/:cid/product/:pid', async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity; 
    const quantityNUmber = parseInt(quantity.quantity)
    const result = await cartManager.updateQuantity(cid, pid, quantity)
    res.send(result)
})
cartRouter.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const result = await cartManager.empyCart(cid)
    res.send(result)
})

cartRouter.delete('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await cartManager.deleteProductFromCart(cid, pid)
    res.send(result)
})
export default cartRouter;