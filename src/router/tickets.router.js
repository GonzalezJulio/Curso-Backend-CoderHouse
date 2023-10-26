import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import ticketsController from "../controllers/tickets.controller.js";
import { checkAdmin } from '../utils/secure.middleware.js'
const router = Router()



router.get('/', checkAdmin, ticketsController.getAll)
router.get('/:cid/purchase', cartsController.createTicket)

export default router