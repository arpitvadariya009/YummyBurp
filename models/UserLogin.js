const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    Image:String,
})

const UserLogin = mongoose.model('UserLogin', userSchema);
module.exports = UserLogin;