var express = require('express');
var router = express.Router();

const SiteController = require('../controllers/site.js');

router.route('/:id')
.get(SiteController.site_detail)
.put(SiteController.site_update);

module.exports = router;