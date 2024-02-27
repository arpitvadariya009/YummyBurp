const express = require('express');
const Router = express.Router();
const uploadMiddleware = require('../middleware/fileUpload');

const {
    restRegister,
    getRestaurants,
    updateRestaurant,
    DeleteRestaurant
}=require('../restaurantController/R_registerController')


Router.post('/rest/register',uploadMiddleware,restRegister)
Router.post('/rest/get',getRestaurants)
Router.put('/rest/updated/:id',uploadMiddleware,updateRestaurant)
Router.delete('/rest/delete/:id',DeleteRestaurant)


module.exports = Router;
