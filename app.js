const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

const config = require('./config');

// database
require('./db/mongoose');

// use morgan for logging
app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');


// setup cors
app.use(function (req, res, next) {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Controll-Allow-Headers', 'Content-type, x-auth');
    next();
})
// frontend routes
app.use(require('./routes/frontend'));
// todo RESTful api
app.use('/todos', require('./routes/todoapi'));
// user RESTful api
app.use('/users', require('./routes/userapi'));

// check route
app.get('/checker', (req, res) => {
    res.render('check');
});


// force https in production
// if (app.get('env') == 'production') {
//     app.use(function (req, res, next) {
//         console.log('force https');
//         app.get('x-forwarded-proto') == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
//     });
// }

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})
