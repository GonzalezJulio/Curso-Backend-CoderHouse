import productsDao from "../models/daos/products.dao.js";
import ProductsDTO from "../models/DTO/products.dto.js";

export default class ProductsRepository {
    constructor() {
        this.model = new productsDao();
    }
    async getAll(params, next){
        try{
            return await this._productDao.getAllProducts(params, next);
        }catch(error){
            error.where = "repository";
            return next(error)
        }
    }

    async getProductById(){
        try{
            return await this._productDao.getProductById
        }catch(error){
            error.where = "repository"
            return next(error)
        }
    }

    async createProduct(){
        try{
            data = ProductsDTO.getProductInputFrom(data);
            return this._productDao.createProduct(data, next)
        }catch(error){
            error.where = "repository"
            return next(error)
        }
    }

    async updateProduct(id, data, next){
        try{
            return await this._productDao.updateProduct(id, data, next)
        }catch(error){
            error.where = "repository"
            return next(error)
        }
    }

async deleteProduct(id, next){
    try{
        return await this._productDao.deleteProduct(id, next)
    }catch(error){
    error.where = "repository"
        return next(error)
    }
}





}
    
    
