require("dotenv").config();
const express = require('express');
const app = express();
const port = process.env.PORT||9001;
const db  = require('./connections/mongoose')
const session = require( "express-session");
const passport = require('passport');
app.use(express.json());



const ejs = require("ejs");
app.set("view engine", "ejs");


require('./connections/passport_config');

app.use(
    session({
      secret: process.env.SESSIONSECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
  );
  app.use(passport.initialize()); 
  app.use(passport.session()); 
  
const loginRoute =  require('./routes/Login_route')
app.use('/',loginRoute)

// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully:-"+port);
})