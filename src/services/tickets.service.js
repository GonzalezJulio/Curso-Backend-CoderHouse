import TicketDTO from "../models/DTO/tickets.dto.js";
import TicketsDAO from "../models/daos/tickets.dao.js"
import cartsService from "./carts.service.js";
import productsDao from "../models/daos/products.dao.js";
import ticketsDao from "../models/daos/tickets.dao.js";


class TicketService {

    getAll = async (user, cid) => {
        const response = await TicketsDAO.getAll()
        return response
    }

    createTicket = async (user, cid) => {
        try{
            const thisCart = await cartsService.getCartById(cid);
            if(!thisCart) return { error: 'Cart id not found' };
            if(thisCart.products.lenght === 0) return { error: 'Cart its empty' };

            const cartFilterOutStock = [];
            const productsForTicket = [];
            let totalPrice = 0;
            for (const { product, quantity } of thisCart.products) {
                if(product.stock < quantity) {
                    cartFilterOutStock.push({
                        product: product,
                        quantity: quantity
                    })
                } else {
                    const remainingStock = product.stock - quantity;
                    totalPrice += product.price * quantity;
                    await productsDao.updateProduct(product._id, { stock: remainingStock })
                    productsForTicket.push({
                        product:{
                            _id: product._id,
                            title: product.title,
                            price: product.price,
                        },
                        quantity,
                    })
                }
            }
            if (productsForTicket.length === 0){
                return {
                    status: 204,
                    warning: 'vacio',
                    message: 'Producto sin stock'
                }
            }else {
                thisCart.products = cartFilterOutStock;
                const newTicket = new TicketDTO(totalPrice, user.email)
                const ticketResponse = await ticketsDao.createTicket(newTicket)
                const updateCart = await cartsService.replaceProducts(cid, thisCart.products);
                const result = {
                        status: 200,
                        purchasedItems:  productsForTicket,
                        tickewt: ticketResponse,
                        remainingStock: updateCart
                    };
                return result;

        

            }
        }catch(error){
            throw error
        }
}
}
export default new TicketService
