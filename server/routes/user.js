const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.js');

router.route('/')
.get(UserController.list)
.post(UserController.add);

// router.route('/:id')
// .get(BlogController.blog_detail)
// .put(BlogController.blog_update)
// .delete(BlogController.blog_delete);

module.exports = router;