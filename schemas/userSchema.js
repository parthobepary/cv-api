const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: Number,
        unique: [true, 'phone is already exist']
    },
    email: {
        type: String,
        required: [true, 'phone is required'],
        unique: [true, 'phone is already exist']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'password should be 6 character']
    }
});

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hasPas = await bcrypt.hash(this.password, salt);
        this.password = hasPas
        next()
    } catch (error) {
        next(error)
    }
});

userSchema.methods.isValidPassword = async function (pas) {
    try {
        return bcrypt.compare(pas, this.password)
    } catch (error) {
        console.log(error);
    }
}



module.exports = mongoose.model('User', userSchema)