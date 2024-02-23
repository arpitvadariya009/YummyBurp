const express = require('express');
const Router = express.Router();
const upload = require('../middleware/fileUpload');

const {
    createBag,
}=require('../restaurantController/bagController')


Router.post('/create/bag',createBag)



module.exports = Router;
