import { Router } from 'express'
import cartRouter from './carts.router.js'
import productsRouter from './products.router.js'
import sessionsRouter from './sessions.router.js'
import viewsRouter from './views.router.js'

const router = Router()

router.use('/', viewsRouter) 
router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
 
router.use('/api/sessions', sessionsRouter) 

export default router