const User = require('./user');
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    var token = req.header('x-auth');

    try {
        var payload = jwt.decode(token)

        User.findOne({
            _id: payload.id
        }).then((r) => {
            if (!r) res.status(401).send({name: 'UserNotFound'})
            req.user = r;
            req.token = token;
            next();
        }, (e) => res.status(401).send({name: e.name, message: e.message}))

    }
    catch (e) { res.status(401).send({name: 'InvalidToken'}) }

}
