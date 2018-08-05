const router = require('express').Router();
const authenticate = require('../db/authenticate');

// router.get('/', authenticate(false), (req, res) => {
//     if (req.auth.code == 200) {res.render('home')}
//     else {res.render('login')}
// });

router.get('/', (req, res) => {
    res.render('home')
});

router.get('/login', (req, res) => { res.render('login') });
router.get('/register', (req, res) => { res.render('register') });

router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    res.status(500).send('server is down!');
});

router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    res.status(500).send('server is down!');
});

module.exports = router;
