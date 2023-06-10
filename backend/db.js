const mongoose = require('mongoose')
require('dotenv').config();
const URI = process.env.DATABASE

mongoose.set("strictQuery", false);
const connectToMongo = () => {
    mongoose.connect(URI).then(() => {
        console.log("Connected.....");
    }).catch((err)=>{console.log(`No connetion, error : ${err}`);})
}

module.exports = connectToMongo;
