import { Router } from 'express';
import MessageController from '../controllers/message.controller.js'



const router = Router()

router.get('/', MessageController.getAll)
router.post('/', MessageController.saveMessage)

export default router