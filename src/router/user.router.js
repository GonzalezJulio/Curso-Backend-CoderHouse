import { Router } from 'express';
import UserController from '../controllers/users.controller.js';

const router = Router()

//----api/users
router.get('/', UserController.getUser)
router.get('/:uid', UserController.getUserByName)
router.post('/generate-recovery-token', UserController.recoveryPassToken)
router.post('/reset-password', UserController.resetPassword)
router.post('/', UserController.createUser)
router.put('/premium/:uid', UserController.changeRole)
router.delete('/:uid', UserController.deleteUser)



export default router