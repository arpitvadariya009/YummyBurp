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

//connect default api structure 
app.use('/', userLogin);
app.use('/api/v1', restRegister);

// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully :- "+ port);
})