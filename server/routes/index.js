var express = require('express');
var router = express.Router();
var path = require('path');

router.route('/').get(function(req, res) {
    res.status(200).json('Resume site comming soon');
});

module.exports = router;