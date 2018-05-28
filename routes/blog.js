const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/blog.js');

router.route('/')
.get(BlogController.blog_list)
;

module.exports = router;