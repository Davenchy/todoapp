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

// frontend routes
app.use(require('./routes/frontend'));

// cors support
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Accept, X-Access-Token, X-Application-Name, X-Request-Sent-Time");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PATCH, DELETE, PUT");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// todo RESTful api with cors support
app.use('/todos', require('./routes/todoapi'));
// user RESTful api with cors support
app.use('/users', require('./routes/userapi'));

// check route
app.get('/checker', (req, res) => {
    res.render('check');
});


// force https in production
if (app.get('env') == 'production') {
    app.use(function (req, res, next) {
        console.log('force https');
        app.get('x-forwarded-proto') == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})
