import UserService from '../services/users.service.js'
import UserDTO from './DTO/users.dto.js'

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
            const _id = req.params._id
            let foundUser = await UserService.getUserByName(_id); 
            if(!foundUser) return { status: 'failed', message: 'Usuario no registrado'}
            res.status(200).send(foundUser)
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
    }

    createUser = async (req, res) => {
        try{
            const User = req.body
            const response = await UserService.createUser(User)
            res.status(200).send(response)
        }catch(error){
            res.status(400).send({ status: 'Error 400', message: error.message });
        }
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
}
export default new UserController()