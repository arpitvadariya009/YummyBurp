const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
    rest_name: {
        type: String,
    },
    rest_bannerImg: {
        type: String
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    otp: {
        type: String
    },
    contactNo: {
        type: String
    },
    location: {
        type: [Number], // Assuming [longitude, latitude] format
        index: '2dsphere' // Create a 2dsphere index for location-based queries
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    warningCount: {
        type: Number,
        default: 0
    },
    verifiedYet: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true});

const R_registerSchema = mongoose.model('R_register', restaurantSchema);
module.exports = R_registerSchema;
