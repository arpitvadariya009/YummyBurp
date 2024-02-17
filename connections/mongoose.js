const mongoose = require('mongoose');
const db = mongoose.connect('mongodb+srv://arpitvadariya003:808280@cluster0.plaliru.mongodb.net/');

if(db){
    console.log("database connected successfully");
}
else{
    console.log("db not connected");
}

module.exports = db;