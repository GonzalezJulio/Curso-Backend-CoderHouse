import userModel from '../schemas/user.model.js'

class UserDAO {
    constructor() {
        console.log('Users DAO conected')
    }

    async getUser() {
        const user =  await userModel.find().lean();
        return user;
    }

    async getUserByName(uid) {
        return await userModel.findOne({ uid });
    }
    
    async createUser(userData) {
        try{
            let exists = await userModel.findOne({ email: userData.email })
            if (exists){
                return {
                    status: 409,
                    error: "Email registrado"
                }
            }
        const user = await userModel.create(userData)
        return ({ status: 200, message: `Usuario Creado`, payload: user })

        }catch(error){
            throw error;
        }
    }

    

    async deleteUser(_id) {
        const user =  await userModel.deleteOne({ _id })
        return user;
    }
    getUserByEmail = async (email) => {
        try {
            const user = await userModel.findOne({ email: email })
            return user
        } catch (error) {
            throw error
        }
    }
    updateUser = async (newData) => {
        try {
            const foundUser = await userModel.findById(newData._id)
            const updatedUser = await userModel.findByIdAndUpdate(foundUser._id, newData, { new: true });
            return updatedUser;
        } catch (error) {
            throw error
        }
    }

    changeRole = async (uid) => {
        try {
            const foundUser = await userModel.findById(uid)
            if (!foundUser) return { status: 'error', message: 'user not found' }

            if (foundUser.role === 'admin') {
                return { message: 'Your are Admin, king of the Rhino Realm, your vow cant be changed.' }
            }

            const newRole = (foundUser.role === 'user' ? 'premium' : 'user')
            const result = await userModel.findByIdAndUpdate(uid, { role: newRole }, { new: true });

            return result
        } catch (error) {
            throw error
        }
    }

    deleteUser = async (uid) => {
        try {
            let exists = await userModel.findById(uid)
            let response = `User ${exists.name} ${exists.lastname} with ${exists.email} mail was deleted.`

            const result = await userModel.deleteOne({ _id: uid });
            if (result.deletedCount === 0) {
                return null
            }
            return { status: 'Success.', payload: response };
        } catch (error) {
            throw error;
        }
    }
};

export default new UserDAO()