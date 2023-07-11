import fs from "fs/promises";

export default class CartManager {
    constructor (path) {
        this.path = `./db/${path}.json`;
        this.carts = [];
    }
    
    async #saveCart(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts))
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

    async addCart(cartAdd) {
        
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
        const carts = await this.getCart();
        const cart = carts.find((cart) => cart.id == idCart)
        return cart;

      }

      async updateCart(idCart, cart) {
        const carts = await this.getCart();
        const cartIndex = carts.findIndex((cart) => cart.id == idCart);
        if (cartIndex == -1) return false;

        carts[cartIndex] = {...carts[cartIndex], ...cart}
        await this.#saveCart(carts)
    } 

    async cartAddProduct(idCart, idProduct, product, quantity) {
        const carts = await this.getCart();
        const cart = carts.filter((cart) => cart.id == idCart)

        const productIndex = product.findeIndex((product) => product.id == idProduct)
        if(productIndex == -1) return false;

        carts[productIndex] = {...carts[productIndex], ...carts},
        await this.#saveCart();


    }

    
}

