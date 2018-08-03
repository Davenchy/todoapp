const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const isCloud = process.env.PORT?true:false;
// const isCloud = true;

var url = 'mongodb://localhost:27017/todoapp';
if (isCloud) url = 'mongodb://admin2:admin2123456@ds111492.mlab.com:11492/todoapp';

mongoose.Promise = global.Promise;

mongoose.connect(url, {useNewUrlParser: true}).then(() => {
    console.log('connected to database server');
});

module.exports = {mongoose};
