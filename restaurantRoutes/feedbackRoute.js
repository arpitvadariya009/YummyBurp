const express = require('express');
const Router = express.Router();

const {
   restaurantsReviews
}=require('../restaurantController/feedbackController')


Router.post('/create/feedback',restaurantsReviews)



module.exports = Router;
