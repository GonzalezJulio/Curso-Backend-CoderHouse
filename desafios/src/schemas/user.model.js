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
    user: {
        type: String,
        required: true, 
    }, 
    password: {
        type: String,
        required: false, 
    }
});

const userModel = mongoose.model("user", userSchema)
export default userModel