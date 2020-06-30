const mongoose = require('mongoose');
const joi = require('joi');

const commentSchema = mongoose.Schema({
    blogId: String,
    comments: [new mongoose.Schema({
        comment: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    })]
});
const Comment = mongoose.model('Comment', commentSchema);
exports.Comment = Comment;
