const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password must be more than 6 characters']
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        }
    }]
});

// hash user password
userSchema.pre('save', function(next) {

    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcryptjs.hashSync(user.password, 10);

    next();

});

// get user model json version
userSchema.methods.toJSON = function () {
    var user = this;
    return {
        id: user._id,
        name: user.name,
        email: user.email
    }
}

// check user password
userSchema.methods.checkPassword = function (password) {
    var user = this;
    return bcryptjs.compareSync(password, user.password);
}

// generate new token
userSchema.methods.genToken = function () {
    var user = this;
    var token = jwt.sign({id:user._id}, config.secret, { expiresIn: 60 * 60 });
    return token;
}

// find user by token
userSchema.statics.findByToken = function (token) {
    var user = this;

    return new Promise((resolve, reject) => {

        try { var payload = jwt.verify(token, config.secret) }
        catch (e) { reject('TokenInvalid') }

        user.findOne({
            _id: payload.id,
            'tokens.token': token
        }).then((r) => {
            if (!r) reject('NotFound')
            resolve(r);
        }, (e) => reject(e) )
    });
}

const User = mongoose.model('User', userSchema);

module.exports = User;
