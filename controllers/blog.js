const Blog = require('../models/blog');

exports.blog_list = function(req, res) {
    Blog.find({}).sort('-created_at').exec(function(err, blogs) {
        handleError(res, err);
        res.json(blogs);
    });
};

exports.blog_add = function(req, res) {
    const newBlog = new Blog(req.body);
    newBlog.save(function(err, blog) {
        handleError(res, err);
        res.json(blog);
    });
};

exports.blog_detail = function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        handleError(res, err);
        res.json(blog);
    });
};

exports.blog_update = function(req, res) {
    let updateblog = req.body;
    updateblog.update_at = new Date();
    Blog.findOneAndUpdate({_id: req.params.id}, updateblog, {upsert: true}, function(err, blog) {
        handleError(res, err);
        res.json(blog);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}