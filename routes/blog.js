const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Blog, validate } = require('../models/blog');

router.post('/', async (req, res) => {
    const { title, blog } = req.body.blogContent;
    const { name, email } = req.body;

    const { error } = validate(req.body.blogContent);
    if (error) return res.header(400).send(error.details[0].message);
    let blogData = new Blog({
        title,
        blog,
        name,
        email
    });
    await blogData.save();
    res.header(200).send('blog saved successfully')
});

router.get('/', async (req, res) => {
    const blog = await Blog.find().sort([['date', -1]]).select("__id title blog");
    res.send(blog);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) return res.send({ data: 'invalid id provided' });
    const blog = await Blog.findById(id).select("__id title blog name email date");
    res.send(blog)
});

module.exports = router;