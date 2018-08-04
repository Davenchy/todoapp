const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(config.db_uri, {useNewUrlParser: true}).then(() => {
    console.log('connected to database server');
});

module.exports = {mongoose};
