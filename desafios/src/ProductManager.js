import fs from "fs/promises"

export default class ProductManager {
    

    constructor (path) {
        this.path = `./db/${path}.json`;
        this.products = [];

    }

    async #saveProduct(products) {
        await fs.writeFile(this.path, JSON.stringify(products))
        this.products = products;
        return products
    }

    getProducts = async () => {
        try {
            const file = await fs.readFile(this.path, "utf-8")
            const products = JSON.parse(file)
            return products;
        } catch(e) {
            await this.#saveProduct([])
        }
    }

    addProduct = async (productAdd) => {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        } = productAdd;
        try {
            const products = await this.getProducts();
            const productsAdd = {
                id: products.length == 0 ? 1:products[products.length - 1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }

            this.products = products
            products.push(productsAdd)
            await this.#saveProduct(products)
            return productsAdd;

        }catch(e){
            console.log(e)

        }

    }

    async getProductById(idProduct) {
        const products = await this.getProducts();
        const product = products.find(product => product.id == idProduct);
        return product;
    } 
    

    async updateProduct(idProduct, product) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.id == idProduct);
        if (productIndex == -1) return false;

        products[productIndex] = {...products[productIndex], ...product}
        await this.#saveProduct(products)
    } 
    
    
    async deleteProductById(idProduct) {
        const products = await this.getProducts();
        const newProducts = products.filter(product => product.id != idProduct);
        await this.#saveProduct(newProducts); 
    }


}











 