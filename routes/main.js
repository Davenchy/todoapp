module.exports = function (app, User, Todo) {

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/login', (req, res) => { res.render('login') });
    app.get('/register', (req, res) => { res.render('register') });

    app.post('/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        res.status(500).send('server is down!');
    });

    app.post('/register', (req, res) => {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        res.status(500).send('server is down!');
    });

}
