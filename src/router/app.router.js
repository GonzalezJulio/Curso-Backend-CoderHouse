import { Router } from 'express'
import cartRouter from './carts.router.js'
import productsRouter from './products.router.js'
import sessionsRouter from './sessions.router.js'
import viewsRouter from './views.router.js'
import userRouter from './user.router.js'
import messageRouter from './message.router.js'
import ticketsRouter from './tickets.router.js'
import MailingRouter from './mailing.router.js'
import ProductMocking from '../mocking/mocking.js'
const router = Router()

router.use('/', viewsRouter) 
router.use('/api/products', productsRouter)
router.use('/api/carts', cartRouter)
 router.use('/auth', userRouter)
router.use('/api/sessions', sessionsRouter) 
router.use('/api/messages', messageRouter)
router.use('/api/tickets', ticketsRouter)
router.use('/mailing', MailingRouter)

export default router