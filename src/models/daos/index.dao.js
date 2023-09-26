import ProductsDAO from './products.dao.js'
import CartsDAO from './carts.dao.js'
import UserDAO from './users.dao.js'
import MessageDAO from './message.dao.js'
import TicketsDAO from './tickets.dao.js'

export const getDAOS = () => {
    return {
        ProductsDAO,
        CartsDAO,
        UserDAO,
        MessageDAO,
        TicketsDAO,
    };
}