import fs from "fs/promises"


class ProductManager {

    constructor () {
        this.products = [];
        
    }

    getProducts = async () => {
        const file = await fs.readFile("./products.json","utf-8")
        const products = JSON.parse(file)
        return products;
    }

    addProduct = async (id, title, description, price, thumbnail, code, stock = 25) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
            const product = JSON.parse(file)
            const products = {
                id:this.products.length == 0? 1:this.products[this.products.length - 1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            
            this.products = products
            products.push(products)
            await fs.writeFile("./products.json", JSON.stringify(products))
            return products;

        }catch(e){
            console.log(e)

        }
        
    }
   
    getProductById = (idProduct) => {
        const product = this.products.find(products => products.id === idProduct) || "Not Found";
        return product;
    }

    updateProduct = async (idProduct) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
            const product = JSON.parse(file)
            const productNew = this.products.find(products => products.id === idProduct) || "Not Found";
        if (productNew === -1) {
            console.log("NO hay Producto")
            return;
        }
        const products = this.products[productNew];
        const newProduct = {
            ...products, 
            };
        this.products.push(newProduct)

        }catch (e) {
            console.log(e)
        }
        
    }
    

    deleteProduct = (idProduct) => {
        const product = this.products.splice(products => products.id === idProduct, 1 ) || "Not found";
        return product;

    }
 }

 const product = new ProductManager();
 await product.addProduct("Camisa", "Camisa Cuello Mao", 4500, null, "XL")
 await product.addProduct("Remera", "Polo", 2300,null, "XS")
 await product.addProduct("Camisa", "Azul", 29000, null, "M")
/*  await product.updateProduct("bermuda", "Hawai", 6500, null, "M")
 
 console.table(product.getProductById(3)); */
 console.log(await product.getProducts());

/*  product.deleteProduct(1)
 console.log(product.deleteProduct()) */