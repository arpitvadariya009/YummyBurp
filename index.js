require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT||9001;
const db = require('./connections/mongoose');
const session = require( "express-session");
const passport = require('passport');
require('./middleware/passportConflig');
//app json for json structure
app.use(express.json());


//session
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  app.use(passport.initialize()); 
  app.use(passport.session()); 

//connect all routes
const userLogin = require('./userRoutes/loginRoutes');
const restRegister = require('./restaurantRoutes/R_registerRoutes');
const R_bags = require('./restaurantRoutes/bagRoutes');
const R_feedback = require('./restaurantRoutes/feedbackRoute');


//connect default api structure 
app.use('/api/v1', userLogin);
app.use('/api/v1', restRegister);
app.use('/api/v1', R_bags);
app.use('/api/v1', R_feedback);


// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully :- "+ port);
})