const express = require('express');
const Router = express.Router();

const {
    userRegister
}=require('../userController/loginController')


Router.post('/user/register',userRegister);

module.exports = Router;
