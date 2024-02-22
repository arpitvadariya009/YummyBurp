const express = require('express');
const Router = express.Router();
const upload = require('../middleware/fileUpload');

const {
    restRegisiter,
    getRestaurants,
    updateRestaurant,
    DeleteRestaurant
}=require('../restaurantController/R_registerController')


Router.post('/rest/register',upload,restRegisiter)
Router.post('/rest/get',getRestaurants)
Router.put('/rest/updated/:id',upload,updateRestaurant)
Router.delete('/rest/delete/:id',DeleteRestaurant)


module.exports = Router;
