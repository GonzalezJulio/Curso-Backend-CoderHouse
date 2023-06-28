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

    addProduct = async (title, description, price, thumbnail, code, stock = 25) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
            const products = JSON.parse(file)
            const productsAdd = {
                id:this.products.length == 0? 1:this.products[this.products.length - 1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            }
            
            this.products = products;
            products.push(productsAdd);
            await fs.writeFile("./products.json", JSON.stringify(products))
            return productsAdd;

        }catch (e) {
            console.log(e);

        }
        
    };
   
    getProductById = (idProduct) => {
        const product = this.products.find(products => products.id === idProduct) || "Not Found";
        return product;
    }

    updateProduct = async (idProduct, newtitle, newdescription, newprice, newthumbnail, newcode, newstock ) => {
        try {
            const file = await fs.readFile("./products.json","utf-8")
            const product = JSON.parse(file)
            const productNew = this.products.find(products => products.id === idProduct) || "Not Found";
        if (productNew === -1) {
            console.log("NO hay Producto")
            return;
        }
        const productUp = this.products[productNew];
        const newProduct = {
            ...productUp, 
            title: newtitle,
            description: newdescription,
            price: newprice,
            thumbnail: newthumbnail,
            code: newcode,
            stock: newstock,
            };
        this.products.push(newProduct)

        }catch (e) {
            console.log(e)
        }
        
    }
    

    deleteProduct = (idProduct) => {
        
        const product = this.products.find(products => products.id === idProduct, 1 ) || "Not found";
        const productDelet = this.products.splice(product)
        return productDelet;

    }
 }

 const product = new ProductManager();
 /* await product.addProduct("Camisa", "Camisa Cuello Mao", 4500, null, "XL")
 await product.addProduct("Remera", "Polo", 2300,null, "XS")
 await product.addProduct("Camisa", "Azul", 29000, null, "M") */
 await product.updateProduct(1,"bermuda", "Hawai", 6500, null, "M")
 
 /* console.table(product.getProductById(3)); */
 console.log(await product.updateProduct(1));

 /* product.deleteProduct(0)
 console.log(product.deleteProduct()) */