import productsModel from '../schemas/product.model.js'

class ProductsDAO {
    constructor() {
        console.log('Products DAO conected.')
    }

    //GET ALL
    async getAll() {
        try {
            const products = await productsModel.find().lean()
            return products
        } catch (error) {
            throw error;
        }

    }

    //GET PRODUCT BY ID
    getProductById = async (pid) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null

            return foundProduct
        } catch (error) {
            throw error;
        }
    }

    //NEW PRODUCT
    createProduct = async (product) => {
        try {
            const NewProducts = await productsModel.create(product)
            return { status: 200, message: `Producto Agregado`, payload: NewProducts } 
        } catch (error) {
            throw error;
        }
    }
    createMany = async (arrayOfProducts) => {
        try {
            // await productsModel.deleteMany({});
            const response = await productsModel.insertMany(arrayOfProducts)
            return { status: 200, message: `Product added.`, payload: response }
        } catch (error) {
            throw error;
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (pid, newData, user) => {
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(pid, newData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    updateStockAtPurchase = async () => {
        console.log('entro update stock')
    }

    //DELETE PRODUCT
    deleteProduct = async (pid, user) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if(!foundProduct) return null
            if (user.role === 'admin' || user.email === foundProduct.owner ) {
            const result = await productsModel.deleteOne ({ _id: pid });
            return {status: 200 ,message: `Product ${pid} eliminado`, payload: result };
            } else {
                return { message: 'No eres admin o el dueño del producto'}
            }
        } catch (error) { return { status: 'Error', message: error.message } }
    };


    
}

export default new ProductsDAO()