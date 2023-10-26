import ProductsService from "./product.service.js";
import CartsService from "./carts.service.js";
import TicketDTO from "../controllers/DTO/tickets.dto.js";
import TicketsDAO from "../models/daos/tickets.dao.js"

class TicketService {

    getAll = async (user, cid) => {
        const response = await TicketsDAO.getAll()
        return response
    }

    createTicket = async (user, cid) => {
        try {
            if (user.cartId == cid) return { error: 'Cart Id and cid doesnt match' };
            const thisCart = await CartsService.getCartById(cid);
            if (!thisCart) return { error: 'Cart not found not found' };

            
            const cartFilterOutStock = [];
            const productsForTicket = [];
            let totalPrice = 0;
            for (const { product, quantity } of thisCart.products) {
                if (product.stock < quantity) {
                    cartFilterOutStock.push({
                        product: product,
                        quantity: quantity
                    })
                } else {
                    const remainingStock = product.stock - quantity;
                    totalPrice += product.price * quantity;

                    await ProductsService.updateProduct(product._id, { stock: remainingStock })

                    productsForTicket.push({
                        product: {
                            _id: product._id,
                            title: product.title,
                            price: product.price,
                        },
                        quantity,
                    });
                }
            }
            
            if (productsForTicket.length === 0) {
                return {
                    status: 204,
                    warning: 'no content',
                    message: "No se pudo comprar ningun producto por falta de stock"
                }
            } else {
                
                thisCart.products = cartFilterOutStock;
                
                const newTicket = new TicketDTO(totalPrice)
                const ticketResponse = await TicketsDAO.createTicket(newTicket)
                const updatedCart = await CartsService.replaceProducts(cid, thisCart.products)

                //No escencial
                const info = {
                    updatedCart: updatedCart,
                    purchasedItems: productsForTicket,
                    ticket: ticketResponse
                };
                console.log(info)
                return info;
            }
        } catch (error) {
            throw error
        }
    }
}

export default new TicketService