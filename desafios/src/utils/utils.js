//Paso Uno, crear utils
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);



const KEY = "holamundo"
export const generateToken = (user) => {
    const token = jwt.sign({ user }, KEY, { expiresIn: '6h' })
    return token }
export const authToken = (req, res, next) => {
    const headerAuth = req.headers
    console.log(req.headers.authorization)
    console.log('utils authToken headerAuth is:')
    console.log(headerAuth)
    if (!headerAuth) return res.status(401).send({ status: 'error', error: 'Not Autorized' })
    

    jwt.verify(token, KEY, (error, credentials) => {
        console.log(error)
        if (error) return res.status(401).send({ status: 'error', error: 'Not autorized second check.' })
        req.user = credentials.user
        next()
    })
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;