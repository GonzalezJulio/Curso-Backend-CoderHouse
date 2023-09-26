import passport from 'passport'
import local from 'passport-local'
import UserDTO from '../controllers/DTO/users.dto.js'
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
        try {
            const userRegisterData = req.body
            let exists = await userModel.findOne({ email: userRegisterData.email })
            if (exists) {
                console.log("User already exist.")
                return done(null, false) 
            }

            const newUser = await UserDTO.createUser(userRegisterData)
            let result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            throw error
        }
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
        // console.log('passport strat GitHubService profile is:')
        // console.log(profile)
        let exists = await userModel.findOne({email: profile._json.email})
        if (!exists) {
            let userRegisterData = {
                name: profile._json.login,
                lastname: '',
                age: '',
                email: profile._json.email,
                password: '',
                
            }
            const newUser = await UserDTO.createUser(userRegisterData)
            let result = await userModel.create(newUser)
            done(null, result)
        } else {
            done(null, exists)
        }
    } catch (error) {
        return done(error)
    }
}))

export const initPassport = () => { }