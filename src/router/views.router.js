import { Router } from "express";
import CartDAO from '../models/daos/carts.dao.js'
import productModel from "../models/schemas/product.model.js";
import SafeUsersDTO from '../controllers/DTO/safeUser.dto.js';
import { checkAdmin, checkSession, checkUser } from "../utils/secure.middleware.js";

/* import { logger } from '../utils/loggerTwo.js' */


const router = Router()


router.get('/', (req, res) => {
    const toProducts = 'http://localhost:8080/products'
    const toCarts = 'http://localhost:8080/carts'
    const toLogin = 'http://localhost:8080/login'
    const toRegister = 'http://localhost:8080/register'
    const toProfile = 'http://localhost:8080/profile'
    const toChat = 'http://localhost:8080/chat'
    const toCurrent = 'http://localhost:8080/api/sessions/current'
    const toAdmin = 'http://localhost:8080/admin'
    const toPurchase = 'http://localhost:8080/api/tickets/${productId}/purchase'
    
    res.render('landing', { toProducts, toCarts, toLogin, toRegister, toProfile, toChat, toCurrent, toAdmin, toPurchase })
})
//-------------------------------USER UTILITIES VIEWS
router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/login', (req, res) => {
    const session = { current: false }
    if (req.session.user) {
        console.log('already logged in')
        session.current = true
        session.name = req.session.user.name
    }
    res.render('login', { session })
})

//-------------------------------EVERYONE
router.get('/products', checkSession, async (req, res) => {
    try {
        const user = req.session.user
        
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const sort = parseInt(req.query.sort) || -1
        const category = req.query.category || ''

        
        const skip = (page - 1) * limit; 
        const matchStage = category ? { category: category } : {}; 

        const countPipeline = [ 
            { $match: matchStage }, 
            { $count: 'totalCategoryCount' },
        ];
        
        const totalCountResult = await productModel.aggregate(countPipeline).exec();
        
        const totalCategoryCount = totalCountResult.length > 0 ? totalCountResult[0].totalCategoryCount : 0;

        
        const pipeline = [
            { $match: matchStage },
            { $sort: { price: sort } },
            { $skip: skip },
            { $limit: limit },
        ];

        const products = await productModel.aggregate(pipeline).exec();
        
        const hasNextPage = skip + products.length < totalCategoryCount;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? page + 1 : null;
        const prevPage = hasPrevPage ? page - 1 : null;

        res.render('products', { products, hasPrevPage, hasNextPage, prevPage, nextPage, limit, sort, category, user })

    } catch (error) { res.status(500).send({ status: 'error', error: error.message }); }
})

router.get('/carts', checkSession, async (req, res) => {
    let response = await CartDAO.getAll()
    let carts = response.carts
    res.render('carts', { carts })
})

router.get('/profile', checkSession, async (req, res) => {
    const safeUserData = new SafeUsersDTO(req.session.user)
    res.render('profile', { user: safeUserData })

})


router.get('/chat', checkSession, checkUser, (req, res) => {
    if (!req.session.user) {
        res.render('failedlogin')
    } else {
        res.render('chat', {
            style: 'index.css',
            userName: req.session.user.first_name,
            userEmail: req.session.user.email,
        })
    }
})



router.get('/admin', checkSession, checkAdmin, async (req, res) => {
    res.render('admin')
})

router.get('/carts/:cid', async (req, res) => {
    if (!req.session.user) {
        res.render('failedlogin')
        return
    }
    const cid = req.params.cid
    const response = await CartDAO.getCartById(cid)
    const thisCart = response.cart

    const products = thisCart.products.map(productData => ({
        ...productData.product.toObject(),
        quantity: productData.quantity
    }));
    res.render('cart', { cid, products })
})
export default router