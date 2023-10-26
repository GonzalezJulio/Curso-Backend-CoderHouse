import { getDAOS } from "../models/daos/index.dao.js"; 

const { UserDAO } = getDAOS()

class UserService {

    async getUser() {
        try{
            return await UserDAO.getUser()
            
        }catch (error) { throw error}
    }

    async getUserByName(uid) {
        try{
            const user = await UserDAO.getUserByName({ uid })
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

    async deleteUser(uid) {
        try{
            const response = await UserDAO.deleteUser(uid)
            return response;
        }catch (error){throw error}
    }

    async getUserByEmail(email) {
        try {
            const user = await usersDao.getUserByEmail(email)
            return user
        } catch (error) {
            throw error
        }
    }
    async updateUser(newData) {
        try {
            const result = await usersDao.updateUser(newData)
            return result
        } catch (error) {
            throw error
        }
    }

    async changeRole(uid) {
        try {
            const result = await usersDao.changeRole(uid)
            return result
        } catch (error) {
            throw error
        }
    }
}

export default new UserService()





