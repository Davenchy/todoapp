const authenticate = require('../db/authenticate');
module.exports = function (app, User, Todo) {



    // user rest api:

    // register
    // login
    // logout
    // update
    // delete

    // register new user
    app.post('/userapi/register', (req, res) => {
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
    app.post('/userapi/login', (req, res) => {
        var email = req.body.email;
        var password = req.body.password;

        User.findOne({email}).then((r) => {
            if (!r) return res.status(401).send({name: 'UserNotFound'});

            if (r.checkPassword(password)) {
                var token = r.genToken();
                res.header('x-auth', token).send(r);
            } else {
                res.status(401).send({name: "InvalidCredentials"});
            }

        }, (e) => res.status(401).send({name:e.name, message: e.message}))
    });

    app.post('/userapi/check', authenticate, (req, res) => res.send({canAccess: true}) );

    // logout user [under development]

    // update user data

    // delete user

}
