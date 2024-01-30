const mongoose = require('mongoose');

//connect to mongoDB database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/enchanted-forage', {
    //avoid deprecation warnings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    });

module.exports = mongoose.connection;