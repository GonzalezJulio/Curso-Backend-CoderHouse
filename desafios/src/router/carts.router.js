import { Router } from 'express'
import CartsController from '../controllers/carts.controller.js'

const cartRouter = Router()

//-----api/carts

//GET CARTS
cartRouter.get('/', CartsController.getAll)

//GET BY ID
cartRouter.get('/:cid', CartsController.getCartById)

//CREATE CART
cartRouter.post('/', CartsController.createCart)

//ADD TO CART
cartRouter.post('/:cid/products/:pid', CartsController.addToCart)

//UPDATE QUANTITY OF PRODUCT IN CART
cartRouter.put('/:cid/products/:pid', CartsController.updateQuantity)

//UPDATE ARRAY OF PRODUCTS IN CART
cartRouter.put('/:cid', CartsController.replaceProducts)

//DELETE PRODUCT FROM CART
cartRouter.delete('/:cid/products/:pid', CartsController.deleteProductFromCart)

//EMPTY CART
cartRouter.delete('/:cid', CartsController.emptyCart)


export default cartRouter