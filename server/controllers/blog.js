const Blog = require('../models/blog');

exports.blog_list = (req, resp) => {
  Blog.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, blogs) => {
    handleError(resp, err);
    resp.json(blogs);
  });
};

exports.blog_add = (req, resp) => {
  const newBlog = new Blog(req.body);
  newBlog.save((err, blog) => {
    handleError(resp, err);
    resp.json(blog);
  });
};

exports.blog_detail = (req, resp) => {
  Blog.findById(req.params.id, (err, blog) => {
    handleError(resp, err);
    resp.json(blog);
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

exports.blog_delete = (req, res) => {
  Blog.remove({_id: req.params.id}, (err) => {
    handleError(res, err);
    res.status(200).json('ok');
  });
};

function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}