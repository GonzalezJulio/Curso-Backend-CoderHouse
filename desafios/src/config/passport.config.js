//updated, Clase 21. Autorizacion y Autenticacion + github
import passport from 'passport'
import local from 'passport-local'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils/utils.js'
import gitHubService from 'passport-github2'


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
                console.log("User already exist.") //-->works ok
                
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
            console.log("passport.config login strat : user doesnt exist")
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
    clientID: 'Iv1.1062e43695f36ec5',
    clientSecret:'22683503c4b83ee214ea2ca6d51843c7c3e6ded1' ,
    callbackURL: 'http://localhost:8080/api/auth/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('passport strat GitHubService profile is:')
        console.log(profile)
        let user = await userModel.findOne({ email: profile.emails[0].value })
        if (!user) {
            let newUser = {
                name: profile._json.login,
                lastname: '',
                age: '',
                email: profile.emails[0].value,
                password: ''
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