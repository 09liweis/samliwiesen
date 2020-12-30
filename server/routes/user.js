const express = require('express');
const router = express.Router();
const {verify} = require('../helpers/verifyToken');

const {list,register,login,detail} = require('../controllers/user.js');

router.post('/list',verify,list);

router.route('/register').post(register);
router.route('/login').post(login);
router.post('/detail',verify, detail);

// router.route('/:id')
// .get(BlogController.blog_detail)
// .put(BlogController.blog_update)
// .delete(BlogController.blog_delete);

module.exports = router;