var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {
    res.status(200).json({
        'msg': 'Welcome to my world'
    });
});

module.exports = router;