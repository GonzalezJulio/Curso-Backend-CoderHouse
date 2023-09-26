import cartModel from "../schemas/carts.schemas.js";
import productManager from "./ProductManager.js";

const product = new productManager();

export default class CartManager {
    
    constructor(){}
    async createCart(){
        try{
            let newCart = {
                products: [],
            }
            await cartModel.create(newCart)
            return ({status: 'Success.', message: 'Carrito Creado.' })
        } catch (error) { return { status: "error", message: error.message } }
    }

    async getCart(){
        let carts =  await cartModel.find().lean()
        return carts.length <= 0 ? ({ status: 'Error.', message: 'Carts collection is empty.' }) : (carts)
    }

    async getCartById(cid) {
        /* return await cartModel.findOne(pid).populate('products', 'product') */
        try {
            let foundCart = await cartModel.findOne({_id: cid}).populate('products', 'product')
            if(!foundCart) return { status: 'failed', message: `Carrito ${cid} no encontrado ` }
            return foundCart

        } catch(error) {
            console.log(`error: ${error}`)
        }

    }

    async addProductToCart(cid, pid) {
        try{
            const cart = await this.getCartById(cid);
            if(!cart){return({status:'error',message:"No se encontro el carrito."})}

            const thisProduct = await product.getProductById(pid)
            if(!thisProduct) {return { status: "failed", message: 'Producto no existente'}}

            const index = await cart.products.findIndex((p) => p.product._id.toString() === pid);
            if (index !== -1) {
                cart.products[index].quantity = parseInt(cart.products[index].quantity) + 1
            } else {
                cart.products.push({ quantity: 1, product: thisProduct })
            }
            await cartModel.updateOne({_id: cart._id}, cart);
            return { status: 'success', message: 'Producto Agregado', payload: cart };
        } catch (error) {
            console.log("ERROR EN CART MANAGER ADD PRODUCT TO CART ", error)
            return { status: "error", message: `Producto no agregado ${error.message}` }
        };
    }

    
    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if(!cart) {
                return { status: 'Failed', message: 'Carrito no encontrado'};
            }

            const foundProduct = await product.getProductById(pid);
            if (!foundProduct) {return { status: 'failed', message: 'Producto no encontrado'};
            }

            const index = cart.products.findIndex((p) => p.product.toString() === pid);
            if (index !== -1) {
                cart.products.splice(index, 1);
                await cartModel.findByIdAndUpdate(cart._id, cart);
                return { status: 'success', message: 'El producto ha sido borrado', payload: cart };
            } else {
                return { status: 'failed', messager: 'Producto no encontrado en el carrito'};

            }

        } catch(error) {
            return { status: 'error', message: `Try failed, caught error: ${error.message}` };

        }
    };

    async updateCartProducts(cid, newProduct){
        try{
            const cart = await cartModel.findById(cid)
            cart.products = newProduct
            await cartModel.findByIdAndUpdate(cid, cart);
            return {status:'success', message: 'Carrito actualizado con exito', payload: cart}

        } catch (error) {
            return {status: 'error', message: `Error al intentar actualizar el carrito: ${error.message}`}
        };
    };

    async updateQuantity (cid, pid, quantity) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) { return {status: 'failed', message: 'carrito no encontrado' } };
            
            const product = cart.products.find(item => item.product === pidc)
            if (!product) { return {status: 'failed', message: 'producto no encontrado'}};

            product.quantity = quantity

            const index = cart.products.findIndex(item => item.product === pid)
            cart.products[index] = product;

            await cartModel.findByIdAndUpdate(cart._id, cart)
            return { status: 'success', message: 'Contador de producto actualizado', payload: cart };
        } catch (error) {
            return { status: 'error', message: `Error al intentar actualizar la cantidad del producto: ${error.message}` }
        }

    };


    async empyCart(cid) {
        try{
            const cart = await cartModel.findById(cid);
            if(!cart){return {status: 'failed', message: 'No se pudo encontrar el carrito'}};

            cart.products = [];
            await cartModel.findByIdAndUpdate(cid, cart)
            return { status: 'success', message: 'Carrito Actualizado', payload: cart } 


        }catch(error) {
            return {status: 'error', message: `Try failed, caught error: ${error.message}` }

        }
    } 
    };
