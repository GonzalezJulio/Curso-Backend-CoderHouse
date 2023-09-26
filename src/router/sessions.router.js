import { Router } from 'express'
import passport from 'passport'
import SafeUsersDTO from '../controllers/DTO/safeUser.dto.js'
import { checkAdmin, checkSession } from '../utils/secure.middleware.js'

const router = Router()

//-------api/sessions
router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
    res.send({ status: 'success', message: 'User registered' })
})
router.get('/failedregister', async (req, res) => {
    console.log("failed register entry")
    res.send({ error: 'Failed register' })
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/failedloginauth' }), async (req, res) => {
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    req.session.user = {
        name: req.user.name,
        lastname: req.user.lastname,
        
        email: req.user.email,
        age: req.user.age,
        password: req.user.password,
        cartId: req.user.cartId,
        role: req.user.role
    }
    res.status(200).send({ status: 200, message: `${req.user.name} ${req.user.lastname} logged in.` })
})
router.get('/failedloginauth', async (req, res) => {
    console.log('Login failed.')
    res.status(400).send({ status: 400, error: 'Failed Login.' })
})

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
router.get('/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
})

router.get('/current', checkSession, checkAdmin, (req, res) => {
    res.send({ status: "success", payload: req.session.user })

})

router.post('/logout', async (req, res) => {
    req.session.destroy(error => {
        if (error) { res.status(400).send({ error: 'logout error', message: error }) }
        res.status(200).send('Session ended.')
    })
})



export default router