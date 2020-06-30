const mongoose = require('mongoose');
const joi = require('joi');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 10,
        maxlength: 200,
        required: true
    },
    blog: {
        type: String,
        minlength: 50,
        required: true
    }
});
const Blog = mongoose.model('Blog', blogSchema);

const validateBlog = (data) => {
    const schema = {
        title: joi.string().min(10).max(200).required(),
        blog: joi.string().min(50).required()
    };
    return joi.validate(data, schema);
}

exports.validate = validateBlog;
exports.Blog = Blog;