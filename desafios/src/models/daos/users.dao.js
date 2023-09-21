import userModel from '../schemas/user.model.js'

class UserDAO {
    constructor() {
        console.log('Users DAO conected')
    }

    async getUser() {
        const user =  await userModel.find().lean();
        return user;
    }

    async getUserByName(username) {
        return await userModel.findOne({ username });
    }

    async recoverUserPassword(username, password) {
        const user = await userModel.findOne({ username });
        if(!user) throw new Error ("Usuario no encontrado")
        const salt = await bcrypt.genSalt(10);
        user.password = bcrypt.hash(password, salt)
        await user.save();
        return true;
    }

    async updateUser(username, password) {
        const user =  await userModel.findOne({ username });
        user.user.avatar = profile_picture;
        await user.save();
        const userObject = user.toObject();
        const userJSON = await model.find({});
        res.render("index", { prod: products } )
    }

    async createUser(user) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        const users = await userModel.create(user);
        return users;
    }

    async validateUser(username, password) {
        const user = await userModel.findOne({ username });
        if(!user) return false;
        const isEqual = awaitBcrypt.compare(password, user.password);
        return isEqual ? user.toObject() : false;
    }

    async deleteUser(username) {
        const user =  await userModel.deleteOne({ username })
        return user;
    }
};

export default new UserDAO()