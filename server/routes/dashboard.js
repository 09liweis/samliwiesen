var express = require('express');
var router = express.Router();
const Blog = require('../models/blog');
const Experience = require('../models/experience');
const Project = require('../models/project');

router.route('/').get(function(req, resp) {
  Blog.count().exec((err, blogs) => {
    Experience.count().exec((err,exs)=>{
      Project.count().exec((err,projs)=>{
        resp.status(200).json({blogs,exs,projs});
      });
    })
  });
});

module.exports = router;