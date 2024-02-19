const mongoose = require('mongoose');
const URL = process.env.MONGO_URL
const db = mongoose.connect(URL);

if(db){
    console.log("database connected successfully");
}
else{
    console.log("db not connected");
}

module.exports = db;