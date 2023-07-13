import fs from "fs/promises";

export default class CartManager {
    

    constructor (path) {
        this.path = `./db/${path}.json`;
        this.carts = [];
    }
    
    async #saveCart(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts, null, 2))
        this.carts = carts;
        return carts
    }

    async getCart() {
        try {
            const file =  await fs.readFile(this.path, "utf-8")
            const carts = JSON.parse(file);
            return carts;

        }catch (e) {
            await this.#saveCart([]);

        }
    }

    async createCart(cartAdd) {
        const {
            
            product,
        } = cartAdd;
        try{
            const cart = await this.getCart();
            const cartAdd = {
                id: cart.length == 0 ? 1:cart[cart.length - 1].id + 1,
               product: [],
            }
            this.cart = cart
            cart.push(cartAdd)
            await this.#saveCart(cart);
            return cartAdd

        } catch(e){
            console.log(e)

        }
      }
      

      async getCartById(idCart) {
        try{
            const carts = await this.getCart();
            const cart = carts.find(cart => cart.id == idCart)
            return cart;

        }catch(e){
            console.log(`Error, carrito no encontrado`)
        }

      }

      async addProductToCart(idCart, prod){
        try{
            const carts = await this.getCart();
            const cart = carts.find((i) => i.id == idCart);
            const cartIndex = carts.indexOf(cart);
            if (cart !== undefined) {
                const cartLo = carts[cartIndex].products.find(i => i.id == prod.id);
                const indexCart = carts[cartIndex].products.indexOf(cartLo);
                if(cartLo){
                    carts[cartIndex].products[indexCart].quantity++;
                    await this.#saveCart(carts)
                    return carts
                }else{
                    prod.quantity = 1;
                    carts[cartIndex].products.push(prod)
                    await this.#saveCart(carts)
                    return carts;
                }
            }else{
                return null
            }
        }catch (e){
            console.log(e)
        }
      }
    
    
    
    
    
    }

      

    

    
