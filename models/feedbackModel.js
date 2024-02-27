const mongoose = require('mongoose');

const  feedbackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant_id: {
        type: String,
    },
    rest_bannerImg: {
        type: String
    },
    feedback_message: {
        type: String,
    },
    ratings:{
        type:Number,
        required:true,
        min: 0, 
        max: 5, 
    },
   
});

const R_feedbackSchema = mongoose.model('R_feedbackSchema', feedbackSchema);
module.exports = R_feedbackSchema;
