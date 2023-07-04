import fs from "fs/promises"


class ProductManager {

    constructor (path) {
        this.path = `./db/${path}.json`
        this.products = [];

    }

    getProducts = async () => {
        const file = await fs.readFile("./products.json","utf-8")
        const products = JSON.parse(file)
        return products;
    }

    addProduct = async (title, description, price, thumbnail, code, stock = 25) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
            const products = JSON.parse(file)
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
            await fs.writeFile("./products.json", JSON.stringify(products))
            return productsAdd;

        }catch(e){
            console.log(e)

        }

    }

    getProductById = (idProduct) => {
        const product = this.products.find(products => products.id === idProduct, 1);
        return product;
    }
// aca lo podes encontrar en el video de ascincronia, minuto 11, debemos busca el id de producto con findIndex, una ves con el findIndex, vamos a modificar el producto 
    updateProduct = async (idProduct, newTitle, newDescription, newPrice) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
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
        await fs.writeFile("./products.json", JSON.stringify(products))
        return newProduct

        }catch (e) {
            console.log(e)
        }

    }
    deleteProduct = async(idProduct) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
        const products = JSON.parse(file)
        let indiceProducto = products.findIndex(function(product) {
            return product.id == idProduct;
        });
        if (indiceProducto !== -1) {
            this.products.splice(indiceProducto);
            console.log('El producto se elimino del carrito');
        } else {
            console.log('el producto no se encontro en el carrito')
        }

        }catch(e) {
            console.log(e)
        }
        
    }


    
 }

 const product = new ProductManager();
 /* await product.addProduct("Camisa", "Camisa Cuello Mao", 4500, null, "XL")
 await product.addProduct("Remera", "Polo", 2300,null, "XS")
 await product.addProduct("Camisa", "Azul", 29000, null, "M") */
 await product.updateProduct(1, "bermuda", "Hawai", 6500,)
/*  await product.deleteProduct(3) */
/* console.table(product.getProductById(3)); */
 console.log(await product.getProducts());










 