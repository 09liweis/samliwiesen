const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.js');

router.route('/')
.get(CategoryController.category_list);

router.route('/import')
.get(CategoryController.category_import);

router.route('/:id')
.get(CategoryController.category_detail);

module.exports = router;