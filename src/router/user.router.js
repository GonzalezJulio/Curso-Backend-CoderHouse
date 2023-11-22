import { Router } from 'express';
import UserController from '../controllers/users.controller.js';
import { checkSession, checkAdmin, checkUser, checkAdminAndPremium } from '../utils/secure.middleware.js'
import { uploader, userUpload } from '../utils/utils.js';

const router = Router()

//----api/users
router.get('/', UserController.getUser)

router.get('/:uid', UserController.getUserByName)
router.post('/generate-recovery-token', UserController.recoveryPassToken)
router.post('/reset-password', UserController.resetPassword)
router.post('/', UserController.createUser)
router.get('/premium/:uid', checkSession, checkAdmin, UserController.changeRole)
router.delete('/:uid', checkSession, checkAdmin, UserController.deleteUser)

//MULTER
router.post('/:uid/documents', userUpload, UserController.uploadCredentials)


export default router