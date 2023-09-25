import { getDAOS } from "../models/daos/index.dao.js"; 
import usersDao from "../models/daos/users.dao.js";
const { UserDAO } = getDAOS()

class UserService {

    async getUser() {
        try{
            return await UserDAO.getUser()
            
        }catch (error) { throw error}
    }

    async getUserByName(_id) {
        try{
            const user = await UserDAO.getUserByName({ _id })
            if(user === null ) return { status: 'error', message: 'Usuraio No Encontrado'}
            return user
        }catch (error){throw error}
    }

    async createUser(user) {
        try{
            const response = await UserDAO.createUser(user)
            return response
        }catch(error) {throw error}
    }

    async deleteUser(_id) {
        try{
            const response = await UserDAO.deleteUser(_id)
            return response;
        }catch (error){throw error}
    }
}

export default new UserService()