const User = require('./user');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (auto = true) {
    return (req, res, next) => {
        var token = req.header('x-auth');

        try {
            var payload = jwt.verify(token, config.secret);

            User.findOne({_id: payload.id }).then((r) => {
                if (!r) {
                    if (auto) res.status(401).send({name: 'UserNotFound'})
                    else { req.auth = { error: 'UserNotFound', code: 401 }; next(); }
                }

                req.auth = { user: r, token, code: 200 }
                next();

            }, (e) => {
                if (auto) res.status(401).send({name: e.name, message: e.message})
                else req.auth = { error: {name: e.name, message: e.message}, code: 401 }
            })

        }
        catch (e) {
            if (auto) res.status(401).send({name: 'InvalidToken'})
            else { req.auth = {error: 'InvalidToken', code: 401}; next(); }
        }
    }
}
