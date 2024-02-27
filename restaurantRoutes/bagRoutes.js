const express = require('express');
const Router = express.Router();

const {
    createBag,
    getBag
}=require('../restaurantController/bagController')


Router.post('/create/bag',createBag)
Router.get('/get/bag',getBag)



module.exports = Router;
