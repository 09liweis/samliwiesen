var express = require('express');
var router = express.Router();

const Comment = require('../models/comment');

router.get('/', (req, res, next) => {
  Comment.find({}).exec((err, comments) => {
    if (err) throw err;
    res.send(comments);
  });
});

router.post('/', (req, res, next) => {
  const name = req.body.name;
  const content = req.body.content;
  const comment = Comment({
    name: name,
    content: content
  });

  comment.save((err) => {
    if (err) throw err;
    res.send(comment);
  });
});

module.exports = router;
