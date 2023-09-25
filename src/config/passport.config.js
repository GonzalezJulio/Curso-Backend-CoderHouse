import passport from 'passport'
import local from 'passport-local'
import userModel from '../models/schemas/user.model.js'
import { createHash, isValidPassword} from '../utils/utils.js'
import gitHubService from 'passport-github2'
import 'dotenv/config'

const LocalStrategy = local.Strategy

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
})

passport.use('register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { name, lastname, email, age, password: userPassword } = req.body
        try {
            let user = await userModel.findOne({ email: username })
            if (user) {
                console.log("Usuario Existente") 
                return done(null, false)
            }
            const newUser = { name, lastname, email, age, password: createHash(userPassword) } //hasheamos el pass
            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) { return res.status(400).send({ status: "error", error: "" }) }
    }
))

//login strategy
passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (userEmail, password, done) => {
    try {
        const user = await userModel.findOne({ email: userEmail })
        if (!user) {
            console.log("Inicializacion de Usuario: Usuario no exite")
            return done(null, false)
        }
        if (!isValidPassword(user, password)) return done(null, false)
        return done(null, user) 
    } catch (error) {
        return done(error)
    }
}))

//github
passport.use('github', new gitHubService({
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_CLIENTSECRET,
    callbackURL: process.env.GITHUB_CALLBACK
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('passport strat GitHubService profile is:')
        console.log(profile)
        let user = await userModel.findOne({email: profile._json.email})
        if (!user) {
            let newUser = {
                name: profile._json.login,
                lastname: '',
                age: '',
                email: profile._json.email,
                password: '',
                cartId: 'for now, just a string',
            }
            let result = await userModel.create(newUser)
            done(null, result)
        } else {
            done(null, user)
        }
    } catch (error) {
        return done(error)
    }
}))

export const initPassport = () => { }