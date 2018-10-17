const Blog = require('../models/blog');

exports.blog_list = (req, res) => {
    Blog.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, blogs) => {
        handleError(res, err);
        res.json(blogs);
    });
};

exports.blog_add = (req, res) => {
    const newBlog = new Blog(req.body);
    newBlog.save((err, blog) => {
        handleError(res, err);
        res.json(blog);
    });
};

exports.blog_detail = (req, res) => {
    Blog.findById(req.params.id, (err, blog) => {
        handleError(res, err);
        res.json(blog);
    });
};

exports.blog_update = (req, res) => {
    let updateblog = req.body;
    updateblog.update_at = new Date();
    Blog.findOneAndUpdate({_id: req.params.id}, updateblog, {upsert: true}, (err, blog) => {
        handleError(res, err);
        res.json(blog);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}