import ProductsDAO from './products.dao.js'
import CartsDAO from './carts.dao.js'
import UserDAO from './users.dao.js'


export const getDAOS = () => {
    return {
        ProductsDAO,
        CartsDAO,
        UserDAO,
    };
}