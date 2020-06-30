const express = require('express');
const router = express.Router();
const { Blog, validate } = require('../models/blog');

router.post('/', async (req, res) => {
    const { title, blog } = req.body;
    const { error } = validate(req.body);
    if (error) return res.header(400).send(error.details[0].message);
    let blogData = Blog({
        title,
        blog
    });
    blogData = await blogData.save();
    res.header(200).send('blog saved successfully')
});

router.get('/', async (req, res) => {
    const blog = await Blog.find().select("__id title blog");
    res.send(blog);
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const blog = await Blog.findById(id).select("__id title blog");
    res.send(blog);
});

module.exports = router;