const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    Image:String,
})

const AuthLogin = mongoose.model('AuthLogin', userSchema);
module.exports = AuthLogin;