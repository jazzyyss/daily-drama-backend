const express = require('express');
const router = express.Router();
const { Comment } = require('../models/commets');

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('comment received')
});

module.exports = router;