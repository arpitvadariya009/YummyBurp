const express = require('express');
const app = express();
const port = process.env.PORT;
const db  = require('./connections/mongoose')



// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully");
})