import userModel from '../schemas/user.model.js'

class UserDAO {
    constructor() {
        console.log('Users DAO conected')
    }

    async getUser() {
        const user =  await userModel.find().lean();
        return user;
    }

    async getUserByName(_id) {
        return await userModel.findOne({ _id });
    }

    

   

    async createUser(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const users = await userModel.create(user);
        return users;
    }

    

    async deleteUser(_id) {
        const user =  await userModel.deleteOne({ _id })
        return user;
    }
};

export default new UserDAO()