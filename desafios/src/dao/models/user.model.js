import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }, 
    lastname: {
        type: String, 
        required: true,
    }, 
    username: {
        type: String,
        required: true, 
    }, 
    password: {
        type: String,
        required: true, 
    },
    salt: {
        type: String,
        required: true,
    },
});

const userModel = mongoose.model("user", userSchema)
export default userModel