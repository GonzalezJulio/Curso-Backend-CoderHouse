import { Router } from "express";
import CartManager from '../models/filemanager/CartsManager.js'
import productModel from "../dao/models/product.model.js";
import { authToken } from "../utils/utils.js";

const cartManager = new CartManager()

const router = Router()

//landing page
router.get('/', (req, res) => {
    const toProducts = 'http://localhost:8080/products'
    const toCarts = 'http://localhost:8080/carts'
    const toLogin = 'http://localhost:8080/login'
    const toRegister = 'http://localhost:8080/register'
    const toProfile = 'http://localhost:8080/profile'
    res.render('landing', { toProducts, toCarts, toLogin, toRegister, toProfile })
})

//GET PRODUCTS  con PAGINATE
router.get('/products', async (req, res) => {
    try {
        console.log('entra products')
        if (!req.session.user) res.status(400).send({ status: 'error', message: 'You are not logged in.' })
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

//GET CARTS Router de carts
router.get('/carts', async (req, res) => {
    if (!req.session?.user) res.redirect('/login');
    let carts = await cartManager.getCart()
    res.render('carts', { carts }) 
})

//GET CART BY ID Router de carts
router.get('/carts/:cid', async (req, res) => {
    if (!req.session?.user) res.redirect('/login');
    const cid = req.params.cid
    const thisCart = await cartManager.getCartById(cid)

    const products = thisCart.products.map(productData => ({
        ...productData.product.toObject(),
        quantity: productData.quantity
    }));


    res.render('cart', { cid, products })
})

//GET CHAT Router de aplicacion chat
router.get('/chat', (req, res) => {
    res.render('chat', {
        style: 'index.css'
    })
})


//GET USERS AND SESSIONS

//GET register
router.get('/register', (req, res) => {
    res.render('register')
})

//GET login 
router.get('/login', (req, res) => {
    const session = { current: false }
    if (req.session.user) {
        console.log('logged in')
        session.current = true
        session.name = req.session.user.name
    }
    res.render('login', { session })
})


router.get('/profile', async (req, res) => {
    if (req.session.user === undefined) {
        res.render('failedlogin')
    } else {
        console.log(req.session.user)
        res.render('profile', { user: req.session.user })
    }
})

export default router