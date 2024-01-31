const mongoose = require('mongoose');
require ('dotenv').config();

//connect to mongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/enchantedforage');

module.exports = mongoose.connection;