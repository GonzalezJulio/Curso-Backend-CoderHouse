import fs from "fs/promises"


export default class ProductManager {

    constructor () {
        this.path = "./db/products.json"
        this.products = [];

    }

    async #saveProduct(products) {
        await fs.writeFile("./db/products.json", JSON.stringify(products) )
        this.products = products;
        return products
    }

    getProducts = async () => {
        try {
            const file = await fs.readFile("./db/products.json","utf-8")
            const products = JSON.parse(file)
            return products;
        } catch(e) {
            await this.#saveProduct([])
        }
    }

    addProduct = async (product) => {
        const {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        } = product;
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

    getProductById = (idProduct) => {
        const product = this.products.find(products => products.id === idProduct, 1);
        return product;
    }

    updateProduct = async (idProduct, newTitle, newDescription, newPrice) => {
        try {
            const file = await fs.readFile("./db/products.json","utf-8")
            const products = JSON.parse(file)
            const productNew = products.splice((products) => products.id == idProduct, 1);
        if (productNew === -1) {
            console.log("NO hay Producto")
            return;
        }
        const productsAdd= this.products[productNew];
        const newProduct = {
            ...productsAdd, 
            id: products.length == 0 ? 1:products[products.length - 1].id + 1,
            title: newTitle,
            description: newDescription,
            price: newPrice, 
            
            };
        this.products = products
        products.push(newProduct)
        await fs.writeFile("./db/products.json", JSON.stringify(products))
        return newProduct

        }catch (e) {
            console.log(e)
        }

    }
    async deleteProductById(idProduct) {
        const products = await this.getProducts();
        const newProducts = products.filter((product) => product.id != idProduct);
        await this.#saveProduct(newProducts); 
    }


    
 }

/*  const product = new ProductManager();
 await product.addProduct("Camisa", "Camisa Cuello Mao", 4500, null, "XL")
 await product.addProduct("Remera", "Polo", 2300,null, "XS")
 await product.addProduct("Camisa", "Azul", 29000, null, "M")
 await product.updateProduct(1, "bermuda", "Hawai", 6500,)
 await product.deleteProduct(3)
console.table(product.getProductById(3));
 console.log(await product.getProducts());
 */









 