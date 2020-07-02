const express = require('express');
const router = express.Router();
const { Comment } = require('../models/commets');

router.post('/', async (req, res) => {
    console.log(req.body);
    const { blogId, name, email, comment } = req.body;
    const blogExists = await Comment.find({ blogId: blogId });
    if (blogExists.length < 1) {
        let commentData = Comment({
            blogId,
            comments: {
                name,
                email,
                comment
            }
        });
        commentData.save();
        res.send('new comment saved')

    } else {
        blogExists[0].comments.push({ name, email, comment });
        await blogExists[0].save();
        res.send('existing comment saved')
    }

});
router.get('/', async (req, res) => {
    const { blogId } = req.query;
    try {
        const comments = await Comment.find({ blogId });
        res.send(comments);
    } catch (err) {
        res.send(err.message);
    }
})

module.exports = router;