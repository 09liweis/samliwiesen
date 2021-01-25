const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blog.js');

router.route('/')
.get(BlogController.findList)
.post(BlogController.add);

router.route('/:id')
.get(BlogController.blog_detail)
.put(BlogController.blog_update)
.delete(BlogController.blog_delete);

module.exports = router;