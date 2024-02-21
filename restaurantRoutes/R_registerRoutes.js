const express = require('express');
const Router = express.Router();
const upload = require('../middleware/fileUpload');

const {
    restRegisiter
}=require('../restaurantController/R_registerController')


Router.post('/rest/register',upload.single('image'),restRegisiter)

module.exports = Router;
