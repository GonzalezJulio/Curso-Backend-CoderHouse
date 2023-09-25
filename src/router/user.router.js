import { Router } from 'express';
import UserController from '../controllers/users.controller.js';

const router = Router()

router.get('/', UserController.getUser)
router.get('/:_id', UserController.getUserByName)
router.post('/', UserController.createUser)
router.delete('/:_id', UserController.deleteUser)

export default router