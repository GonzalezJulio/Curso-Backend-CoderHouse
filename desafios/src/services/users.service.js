import { getDAOS } from "../models/daos/index.dao.js"; 
const { UserDAO } = getDAOS()

class UserService {

    async getUser() {
        try{
            return await UserDAO.getUser()
        }catch (error) { throw error}
    }

    async getUserByName(username) {
        try{
            const user = await UserDAO.getUserByName({ username })
            if(user === null ) return { status: 'error', message: 'Usuraio No Encontrado'}
            return user
        }catch (error){throw error}
    }

    async updateUser(username, password) {
        try{
            const response = await UserDAO.updateUser(username, password);
            if(response === null) return {status: 'error', message: 'Usuario No Actulizado'};
            return response; 
        }catch(error) {throw error}
    }

    async recoverUserPassword(username, password){
        try{
            const response = await UserDAO.recoverUserPassword(username, password)
            if(response === null) return {status: 'error', message: 'Usuario No Valido'}
        }catch(error){throw error}
    }
}