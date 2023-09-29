import TicketService from "../services/tickets.service.js"

class TicketsController {
    getAll = async (req, res) => {
        try {
            const response = await TicketService.getAll()
            res.send(response)
        } catch (error) {
            throw error
        }
    }
}

export default new TicketsController()