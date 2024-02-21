require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT||9001;
const db = require('./connections/mongoose');

//app json for json structure
app.use(express.json());

//connect all routes
const userLogin = require('./userRoutes/loginRoutes');
const restRegister = require('./restaurantRoutes/R_registerRoutes');

//connect default api structure 
app.use('/api/v1', userLogin);
app.use('/api/v1', restRegister);

// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully :- "+ port);
})