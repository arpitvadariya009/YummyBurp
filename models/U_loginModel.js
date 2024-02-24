const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');

const userSchema = mongoose.Schema({
    phonenumber: {
        type: String,
        required: true
    },
    isRegistered:{
        type: Boolean,
        default: false
    },
    name: {
        type: String,
    },
    Image:{
        type: String, 
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    location: {
        type: [Number], // Assuming [longitude, latitude] format
        index: '2dsphere' // Create a 2dsphere index for location-based queries
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    },
    otp: {
        type: String
    },
    otpExpiration: {
        type: Date
    },
    jwt_token: {
        type: String
    },
    device_token: {
        type: String
    },
    logout: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isRestaurant: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'U_login'
    }
},{timestamps: true});



userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Generate and store JWT token
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_KEY);
    this.jwt_token = token;

    next();
});

// Method to compare hashed passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;