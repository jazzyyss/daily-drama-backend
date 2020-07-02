const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
    }, config.get('dd_privateKey'));
    return token;
}
const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
    const schema = {
        name: joi.string()
            .min(2)
            .max(50)
            .required(),
        email: joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: joi.string()
            .min(5)
            .max(255)
            .required()
    };
    return joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;