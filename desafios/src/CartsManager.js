import fs from "fs/promises";




export default class CartManager {
    constructor (file) {
        this.file = file
    }
    
    async #saveCart(carts) {
        await fs.writeFile(this.path, JSON.stringify(cart))
        this.carts = carts;
        return carts
    }

    async getCart() {
        try {
            const data =  await fs.promises.readFile(this.file, "utf-8")
            const carts = JSON.parse(data);
            return carts;

        }catch (e) {
            await fs.promises.writeFile(this.file, JSON.stringify([]));
            return [];

        }
    }

    async addCart(idCart, idProduct) {
        const cart = await this.getCart();
        
        const cartIndex = cart.findIndex((cart) => cart.id === idCart);
        const carts = carts[cartIndex];
        if (cartIndex === -1) {
          return "Not found!";
        }
    
        if (cart.products.includes(idProduct)) {
          return "Usuario registrado";
        }
        cart[cartIndex].products.push(idProduct);
        await this.#saveCart(cart);
      }
}