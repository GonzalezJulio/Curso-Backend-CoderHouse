import UserService from '../services/users.service.js'
import 'dotenv/config'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import MailingService from '../mailing/mailing.js'

class UserController {

    getUser = async (req, res) => {
        try{
            let User = await UserService.getUser()
            console.log(User)
            res.status(200).send({ total: User, payload: User})
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message })
        }
    }

    getUserByName = async (req, res) => {
        try{
            const uid = req.params.uid
            let foundUser = await UserService.getUserByName(uid); 
            if(!foundUser) return { status: 'failed', message: 'Usuario no registrado'}
            res.status(200).send(foundUser)
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }
    
    getUserByEmail = async (req, res) => {
        try {
            const email = req.body.email
            let foundUser = await UserService.getUserByEmail(email)
            if (!foundUser) return { status: 'failed.', message: `User ${email} not found in db.` }

            res.status(200).send(foundUser)
        } catch (error) {
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }
    
    createUser = async (req, res) => {
        try{
            const userRegisterData = req.body
            const response = await UserService.createUser(userRegisterData)
            res.status(200).send(response)
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }
    changeRole = async (req, res) => {
        const uid = req.params.uid
        const user = await UserService.getUserById(uid)
        if (user.documents.length === 3) {
            const result = await UserService.changeRole(uid)
            res.status(200).send({ payload: result });
        }
        res.status(403).send({ status: 403, message: 'Not allowed. Credentials files not yet uploaded.' });
    }

    deleteUser = async (req, res) => {
        try{
            const name = req.params.name
            const response = await UserService.deleteUser(name)
            res.status(200).send(response)
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message })
        }

    }
    recoveryPassToken = async (req, res) => {
        try {
            const userEmail = req.body.email

            const user = await UserService.getUserByEmail(userEmail)
            if (!user) return { status: 'failed.', message: `User ${email} not found in db.` }

            const currentPassword = user.password
            const token = jwt.sign({ userEmail: user.email, currentPassword }, process.env.sessions.KEY, { expiresIn: '1h' })
            const resetLink = `http://localhost:8080/reset-password/${token}`

            await MailingService.resetPassword(userEmail, resetLink)


            res.status(200).send({ message: 'Se supone que mail sent', payload: token })

        } catch (error) {
            throw error
        }

    }

    resetPassword = async (req, res) => {
        try {
            console.log('----------------------------USER CONTROLLER, resetPassword')
            const newPassword = req.body.password;
            const confirmPassword = req.body.passwordConfirmation;
            const currentPassword = req.body.currentPassword;
            const userEmail = req.body.userEmail
            if (newPassword !== confirmPassword) {
                return res.status(400).send('Passwords do not match');
            }
            const isSamePassword = bcryptjs.compareSync(newPassword, currentPassword)
            if (isSamePassword) {
                return res.status(400).send('New password cannot be the same as the old password');
            }

            const user = await UserService.getUserByEmail(userEmail)
            const newHashedPassword = bcryptjs.hashSync(newPassword, bcryptjs.genSaltSync(10))
            user.password = newHashedPassword

            const newUserData = {
                _id: user._id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                age: user.age,
                password: newHashedPassword,
                role: user.role,
            }
            console.log('NewUserData')
            console.log(newUserData)

            await UserService.updateUser(newUserData)

            res.status(200).send({ message: 'Password updated' });

        } catch (error) {

        }
    }

    uploadCredentials = async (req, res) => {
        if (!req.files['profile'] || !req.files['address'] || !req.files['account']) {
            return res.status(400).send({ status: 'error', message: 'No se encontraron todos los archivos esperados o no se especificó el propósito.' });
        }
        
        const profileImage = req.files['profile'][0];
        const addressImage = req.files['address'][0];
        const accountImage = req.files['account'][0];

       
        const user = await UserService.getUserByEmail(req.session.user.email)
        user.documents = [
            { name: 'profile', reference: profileImage.path },
            { name: 'address', reference: addressImage.path },
            { name: 'account', reference: accountImage.path }
        ];
        const response = await UserService.updateUser(user)
        res.status(200).send({ status: 'Success', payload: response });
    }

}
export default new UserController()