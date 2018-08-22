var express = require('express');
var router = express.Router();

const SiteController = require('../controllers/site.js');

router.route('/:id')
.get(SiteController.todo_detail)
.put(SiteController.todo_update);

module.exports = router;