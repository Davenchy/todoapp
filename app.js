const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const config = require('./config');

// database
const {mongoose} = require('./db/mongoose');
const User = require('./db/user');
const Todo = require('./db/todo');


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// force https in production
if (app.get('env') == 'production') {
    app.use(function (req, res, next) {
        console.log('force https');
        app.get('x-forwarded-proto') == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
    });
}

// main routes
require('./routes/main')(app, User, Todo);
// todo api
require('./routes/todoapi')(app, User, Todo);
// user api
require('./routes/userapi')(app, User, Todo);

app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
})
