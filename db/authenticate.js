const User = require('./user');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (auto = true) {
    return (req, res, next) => {
        var token = req.cookies['x-auth'] || req.header('x-auth');

        try {
            var payload = jwt.verify(token, config.secret);

            User.findOne({_id: payload.id }).then((r) => {
                if (!r) {
                    if (auto) res.status(401).send({name: 'UserNotFound'})
                    else { req.auth = { error: 'UserNotFound', code: 401, access: false }; next(); }
                }

                req.auth = { user: r, token, code: 200, access: true }
                next();

            }, (e) => {
                if (auto) res.status(401).send({name: e.name, message: e.message})
                else req.auth = { error: {name: e.name, message: e.message}, code: 401, access: false }
            })

        }
        catch (e) {
            if (auto) res.status(401).send({name: 'InvalidToken'})
            else { req.auth = {error: 'InvalidToken', code: 401}; next(); }
        }
    }
}
