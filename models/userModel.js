import mongoose, { Schema } from "mongoose";
import bcrypt, { hash } from 'bcrypt'

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
},{ timestamps: true })

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }
   const salt = await bcrypt.genSalt(10)
   this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.checkPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const user = mongoose.model('Users', userSchema)

export default user