const Blog = require('../models/blog');

exports.blog_list = function(req, res) {
    Blog.find({}).sort('-created_at').exec(function(err, blogs) {
        res.json(blogs);
    });
};