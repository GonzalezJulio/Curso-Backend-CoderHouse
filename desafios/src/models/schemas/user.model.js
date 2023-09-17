import mongoose from "mongoose";

const collectionName = 'users'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        unique: true
    },
    age: {
        type: Number,
        required: true, 
    },
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