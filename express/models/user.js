import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 24
      },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 32,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
        minlength: 5, 
        maxlength: 255
      },
      bio: {
        type: String,
        minlength: 0,
        maxlength: 300,
        default: ''
      },

}, {timestamps: true})

const userModel = mongoose.model('User', userSchema)

export default userModel