import { Router } from 'express'
import ProductsController from '../controllers/products.controller.js'
import { checkAdmin, checkSession, checkUser, checkAdminAndPremium } from '../utils/secure.middleware.js'
const router = Router()

router.get('/', checkSession, ProductsController.getAll)
router.get('/:pid', checkSession, ProductsController.getProductById)
router.post('/', checkSession, checkAdminAndPremium, ProductsController.createProduct)
router.put('/:pid', checkSession, checkAdminAndPremium, ProductsController.updateProduct)
router.delete('/:pid', checkSession, checkAdminAndPremium, ProductsController.deleteProduct)

export default router