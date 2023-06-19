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
            code:this.products.length+1,
            stock,
        }
        this.products.push(products)
        return products;
    }
    
    getProductsById = (idProducts) => {
        const product = this.products.find(products => products.id === idProducts) || "Not Found";
        return product;
    }
    
 }

 const product = new ProductManager();
 product.addProduct("Camisa","Camisa", "Camisa Cuello Mao", 4500)
 product.addProduct("Remera","Remera", "Polo", 2300)
 product.addProduct("Camisa","Camisa", "Azul", 29000)
 product.getProductsById(1);
 console.log(product.getProducts());