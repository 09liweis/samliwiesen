const Blog = require('../models/blog');

exports.findList = (req, resp) => {
  Blog.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, blogs) => {
    handleError(resp, err);
    resp.json(blogs);
  });
};

exports.add = (req, resp) => {
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

exports.blog_update = (req, resp) => {
  let updateblog = req.body;
  updateblog.update_at = new Date();
  Blog.findOneAndUpdate({_id: req.params.id}, updateblog, {upsert: true}, (err, blog) => {
    handleError(resp, err);
    resp.json(blog);
  });
};

exports.blog_delete = (req, resp) => {
  Blog.remove({_id: req.params.id}, (err) => {
    handleError(resp, err);
    resp.status(200).json('ok');
  });
};

function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}