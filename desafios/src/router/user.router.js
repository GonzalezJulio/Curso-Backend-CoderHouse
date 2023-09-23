import { Router } from 'express';
import UserController from '../controllers/users.controller.js';

const router = Router()

router.get('/', UserController.getUser)
router.get('/:name', UserController.getUserByName)
router.post('/', UserController.createUser)
router.delete('/:name', UserController.deleteUser)

export default router