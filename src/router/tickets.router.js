import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import ticketsController from "../controllers/tickets.controller.js";

const router = Router()



router.get('/', ticketsController.getAll)
router.get('/:cid/purchase', cartsController.createTicket)
// probar cambios con el 
export default router