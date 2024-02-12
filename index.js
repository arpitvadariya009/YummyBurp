const express = require('express');
const app = express();
const port = process.env.PORT;




// server connections
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log("server connceted successfully");
})