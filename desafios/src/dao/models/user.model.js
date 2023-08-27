import mongoose from "mongoose";

const collectionName = 'users'
const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: {
        type: String
        
    },
    cartId: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user'
    }
})

const userModel = mongoose.model(collectionName, userSchema)
export default userModel