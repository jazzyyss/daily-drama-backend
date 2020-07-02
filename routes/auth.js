const { User } = require('../models/user');
const joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body)
    const { error } = validate(req.body);
    if (error) return res.send(error);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.send('Invalid Email or Password');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.send('Invalid Email or Password');

    const token = user.generateAuthToken();
    console.log(token);
    res.header("x-auth-token", token)
        .header("access-control-expose-headers", "x-auth-token")
        .send(null);
});

const validate = (user) => {
    const schema = {
        email: joi.string().min(2).max(50).required().email(),
        password: joi.string().min(5).max(1024).required()
    };
    return joi.validate(user, schema);
}

module.exports = router;