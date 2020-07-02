const mongoose = require('mongoose');
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) return res.send("User already registered.");
    console.log(user);
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashPass });
    await user.save();
    res.status(200).send('user registered');
});

module.exports = router;