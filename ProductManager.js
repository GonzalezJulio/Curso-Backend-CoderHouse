class ProductManager {

    constructor () {
        this.products = [];
    }

    getProducts = () => {
        return this.products;
    }

    addProduct = (id, title, description, price, thumbnail, code, stock = 25) => {
        const products = {
            id:this.products.length == 0? 1:this.products[this.products.length - 1].id + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        this.products.push(products)
        return products;
    }
    
    getProductById = (idProduct) => {
        const product = this.products.find(products => products.id === idProduct) || "Not Found";
        return product;
    }
    
 }

 const product = new ProductManager();
 product.addProduct("Camisa","Camisa", "Camisa Cuello Mao", 4500, null, "XL")
 product.addProduct("Remera","Remera", "Polo", 2300,null, "XS")
 product.addProduct("Camisa","Camisa", "Azul", 29000, null, "M")
 console.table(product.getProductById(3));
 console.log(product.getProducts());