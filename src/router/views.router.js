import { Router } from "express";
import CartDAO from '../models/daos/carts.dao.js'
import productModel from "../models/schemas/product.model.js";
import SafeUsersDTO from '../controllers/DTO/safeUser.dto.js';
import { checkAdmin, checkSession, checkUser } from "../utils/secure.middleware.js";
import ProductMocking from '../mocking/mocking.js'
import { logger } from '../utils/logger.js'
import { recoveryPassToken } from '../utils/utils.js';
import userService from "../services/users.service.js"
const router = Router()


router.get('/', checkSession, async (req, res) => {
    const user = await userService.getUserByEmail(req.session.user.email)
    const { _id, name, lastname, email, role, cartId } = user
    const currentUser = {
        fullname: name + " " + lastname,
        email,
        role,
        _id
    }

    const toProducts = 'http://localhost:8080/products'
    const toCarts = 'http://localhost:8080/carts'
    const toLogin = 'http://localhost:8080/login'
    const toRegister = 'http://localhost:8080/register'
    const toProfile = 'http://localhost:8080/profile'
    const toChat = 'http://localhost:8080/chat'
    const toCurrent = 'http://localhost:8080/api/sessions/current'
    const toAdmin = 'http://localhost:8080/admin'
    const toPurchase = 'http://localhost:8080/api/tickets/${productId}/purchase'
    const toMockingProducts = 'http://localhost:8080/mockingproducts'
    const toUsers = 'http://localhost:8080/users'
    const toCart = `http://localhost:8080/carts/${cartId}`
    res.render('pageLanding', { currentUser, toProducts, toCarts, toLogin, toRegister, toProfile, toChat, toCurrent, toAdmin, toPurchase, toMockingProducts, toCart, toUsers })
})
//-------------------------------USER UTILITIES VIEWS
router.get('/register', (req, res) => {
    res.render('userRegister')
})

router.get('/login', (req, res) => {
    const session = { current: false }
    if (req.session.user) {
        console.log('already logged in')
        session.current = true
        session.name = req.session.user.name
    }
    res.render('userLogin', { session })
})

//-------------------------------EVERYONE
router.get('/products', checkSession, async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.session.user.email)
        const { _id, name, lastname, email, role, cartId } = user
        const currentUser = {
            fullname: name + " " + lastname,
            email, 
            role,
            _id,
            cartId
        }
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

        res.render('pageProducts', { products, hasPrevPage, hasNextPage, prevPage, nextPage, limit, sort, category, user })

    } catch (error) { res.status(500).send({ status: 'error', error: error.message }); }
})

router.get('/carts/:cid', checkSession, async (req, res) => {
    const cid = req.params.cid
    const cart = await CartDAO.getCartById(cid)
    const user = await userService.getUserByEmail(req.session.user.email)
    if (user.cartId.toString() !== cid) return res.status(403).send({ status: 403, message: 'This is not your carrito bitch.', cartId: user.cartId, cid })

    const { _id, name, lastname, email, role, cartId } = user
    const currentUser = {
        fullname: name + " " + lastname,
        email,
        role,
        _id,
        cartId
    }
    const products = cart.products.map(productData => ({
        ...productData.product.toObject(),
        quantity: productData.quantity
    }));

    res.render('yourCart', { currentUser, products })
})


router.get('/profile', checkSession, async (req, res) => {
    const safeUserData = new SafeUsersDTO(req.session.user)
    const user = await userService.getUserByEmail(req.session.user.email)
    safeUserData._id = user._id.toString()
    res.render('yourProfile', { user: safeUserData })

})

router.get('/admin', checkSession, checkAdmin, async(req, res) =>{
    res.render('adminCrud')
})

router.get('/users', checkSession, checkAdmin, async(req, res) => {
    const user = await userService.getUser()
    const current =  req.session.user
    res.render('adminUsers', { user, current })
})

router.get('/carts', checkAdmin, checkSession, async (req, res) => {
    let response =  await CartDAO.getAll()
    const { _id, name, lastname, role } = await userService.getUserByEmail(req.session.user.email)
    const currentUser = {
        fullname: name + " " + lastname, _id, role
    }
    let carts = response.carts
    res.render('adminCarts', { carts, currentUser })
})

router.get('/chat', checkSession, checkUser, (req, res) => {
    if (!req.session.user) {
        res.render('pageFailedLogin')
    } else {
        res.render('chat', {
            style: 'index.css',
            userName: req.session.user.name,
            userEmail: req.session.user.email,
        })
    }
})



router.get('/admin', checkSession, checkAdmin, async (req, res) => {
    res.render('admin')
})

router.get('/carts/:cid', async (req, res) => {
    if (!req.session.user) {
        res.render('pageFailedLogin')
        return
    }
    const cid = req.params.cid
    const response = await CartDAO.getCartById(cid)
    const thisCart = response.cart

    const products = thisCart.product.find(productData => ({
        ...productData.product.toObject(),
        quantity: productData.quantity
    }));
    res.render('cart', { cid, products })
})

router.get('/mockingproducts', async (req, res) => {
    try {
        let randomProducts = await ProductMocking(100)
        console.log(randomProducts)
        res.send({ message: 'Mock products x100 created with faker and falso.', payload: randomProducts })
    } catch (error) {}
})

router.get("/logger", checkSession, checkAdmin, (req, res) => {
    logger.error("soy un error");
    logger.warn("soy un warn");
    logger.info("soy un info");
    logger.http("soy un http");
    logger.verbose("soy un verbose");
    logger.debug("soy un debug");
    res.send("probando loggers");
});

router.get('/regiter', (req, res) => {
    res.render('userRegister')
})

router.get('/login', (req, res) => {
    const session = { current: false }
    if(req.session.user) {
        session.current = true
        session.name = req.session.user.name
    } 
    res.render('userLogin', { session })
})

router.get('/pasword-recovery-request', (req, res) => {
    const sessoin = { current: false }
    if(req.session.user){
        sessoin.current = true
        sessoin.name = req.session.user.name
    }
    res.render('passwordRecoveryRequest', {sessoin})
})

router.get('/reset-password/:token', recoveryPassToken, (req, res) => {
    const { userEmail, currentPassword } = req.tokenData;
    res.render('userResetPassword', { userEmail, currentPassword })
})
export default router