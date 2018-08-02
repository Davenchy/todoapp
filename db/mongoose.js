const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/todoapp';

mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log('connected to database server');
});

module.exports = {mongoose};
