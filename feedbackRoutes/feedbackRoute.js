const express = require('express');
const Router = express.Router();
const upload = require('../middleware/fileUpload');


const {
   restaurantsReviews
}=require('../feedbackController/feedbackController')


Router.post('/add/feedback',upload,restaurantsReviews)



module.exports = Router;
