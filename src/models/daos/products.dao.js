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
            console.log(NewProducts)
            return (NewProducts)
        } catch (error) {
            throw error;
        }
    }

    //UPDATE PRODUCT
    updateProduct = async (pid, updatedFields) => {
        try {
            let foundProduct = await productsModel.findById(pid)
            if (!foundProduct) return null
            const updatedProduct = await productsModel.findByIdAndUpdate(pid, updatedFields, { new: true });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    //DELETE PRODUCT
    deleteProduct = async (pid) => {
        try {
            const result = await productsModel.deleteOne({ _id: pid });
            if (result.deletedCount === 0) {
                return null
            }
            return { status: 'Success.', message: `Product ${pid} deleted.` };
        } catch (error) { return { status: 'Error', message: error.message } }
    };


    
}

export default new ProductsDAO()