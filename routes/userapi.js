const router = require('express').Router();
const User = require('../db/user');
const authenticate = require('../db/authenticate');



// user rest api:

// register
// login
// logout
// update
// delete

// get user data
router.get('/', authenticate(false), (req, res) => {
    if (req.auth.access) res.send(req.auth.user);
    else res.status(401).send();
});

// register new user
router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User({ name, email, password });
    var token = user.genToken();
    user.tokens.push({ access: "auth", token });

    user.save().then((r) => {
        if (!r) return res.status(401).send({ name: "Failed" });
        res.header('x-auth', token).send(r.toJSON());
    }, (e) => res.status(401).send({name: e.name, message: e.message}))
});

// login user and get access token
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email}).then((r) => {
        if (!r) return res.status(401).send({name: 'UserNotFound'});

        if (r.checkPassword(password)) {
            var token = r.genToken();
            res.cookie('x-auth', token).header('x-auth', token).send(r);
        } else {
            res.status(401).send({name: "InvalidCredentials"});
        }

    }, (e) => res.status(401).send({name:e.name, message: e.message}))
});

// check authentication
router.post('/check', authenticate(true), (req, res) => res.send({canAccess: true}) );

// logout user
router.post('/logout',authenticate(true), (req, res) => {
    res.cookie('x-auth', '').send();
});

// update user data

// delete user

module.exports = router;
