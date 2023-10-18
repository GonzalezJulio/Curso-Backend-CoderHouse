import passport from 'passport'
import local from 'passport-local'
import UserDTO from '../controllers/DTO/users.dto.js'
import userModel from '../models/schemas/user.model.js'
import { createHash, isValidPassword} from '../utils/utils.js'
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

export const initPassport = () => { }