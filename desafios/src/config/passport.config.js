//updated, Clase 21. Autorizacion y Autenticacion + github
import passport from 'passport'
import local from 'passport-local'
import userModel from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils/utils.js'
import gitHubService from 'passport-github2'

//Inicializamos la estrategia local
const LocalStrategy = local.Strategy

//Basicamente la funcion de passport es gestionar autenticacion y autorizacion de usuarios
//en un modulo totalmente dedicado. Para mantener un codigo prolijo y con un buen orden modular.
//Podemos definir cada estrategia por separado, y exportar solamente el init vacio (o definir todo dentro del init)

// gpt
// serializeUser and deserializeUser is a function used by Passport.js to serialize a user object into the session.
// Serializing a user means converting the user object into a format that can be easily stored in the session.
// This is typically done to reduce the amount of data stored in the session and to improve performance.
passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id)
    done(null, user)
})

//REGISTER strategy
//Nota que passport utiliza sus propios 'middlewares' de acuerdo a cada estrategia
passport.use('register', new LocalStrategy(
    //username sera en este caso el email
    //done sera el callback de resolucion de passport, el primer argumento es para error y el segundo para el usuario en caso de ser afirmativo.
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        //passReToCallback permite que se pueda acceder al objeto req como cualquier otro middleware.
        const { first_name, last_name, email, age, password: userPassword } = req.body
        try {
            let user = await userModel.findOne({ email: username })
            if (user) {
                console.log("User already exist.") //-->works ok
                //NO encontrar un usuario no significa que sea un error, asique el error se lo pasamos como null, pero al usuario como false
                //Esto significa "No ocurrio un error al buscar usuario, pero el usuario ya existe y no puedo dejarte continuar."
                return done(null, false)
            }
            const newUser = { first_name, last_name, email, age, password: createHash(userPassword) } //hasheamos el pass
            let result = await userModel.create(newUser)
            //Si todo sale ok, mandamos done(null, usuarioGenerado)
            //null entonces, significa que no hubo error. (Sino le pasamos el error) - result es el usuario, significando una respuesta afirmativa.
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
                first_name: profile._json.login,
                last_name: '',
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