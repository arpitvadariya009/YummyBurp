const mongoose = require('mongoose');

const bagSchema = new mongoose.Schema({
    dietary_preference: {
        type: String,
    },
    bag_type: {
        type: String,
    },
    bag_name: {
        type: String,
        default: "suprise bag",
    },
    price: {
        type: Number,
    },
    bag_count: {
        type: Number,
    },
    collection_time: {
        type: String,
    },
    enough_for: {
        type: Number,
    },
    rest_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'R_register',
        required: true
    },
});

const bagsmodel = mongoose.model('bags', bagSchema);

module.exports = bagsmodel;
