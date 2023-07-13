import { Router } from "express"; 
import CartManager from "../CartsManager.js";
import ProductManager from "../ProductManager.js";
const cartRouter = Router();
const cartManager = new CartManager("carts");
const productManager = new ProductManager("products")


// Crea Carrito
cartRouter.post("/", async (req, res) => {
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
cartRouter.post('/:idCart/products/:idProduct', async(req, res) => {
    const idCart = Number(req.params.idCart)
    const idProduct = Number(req.params.idProduct)
    try{
        /* const { idCart, idProduct } = Number(req.params); */
        const prod = await productManager.getProductById(idProduct);
        const productModificado = {
            id: prod.id
        }
        if (prod){
            const result = await cartManager.addProductToCart(idCart, productModificado);
            
            result !== null 
            
            ? res.status(200).send({"success" : "Producto Agregado", result})
             
            : res.status(404).send({"error": "Carrito no encontrado ID Inexistente"})
            
        }else{
            res.status(404).send({"error": "ID Ingresado Inexistente"})
        }
    }catch(e){
        res.status(502).send({ error: "Numero de producto incorrecto" });   
        }
})

export default cartRouter;