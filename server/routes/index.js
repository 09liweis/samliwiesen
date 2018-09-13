var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {
    res.json({
        'code': 200,
        'msg': 'Welcome to my world'
    });
});

module.exports = router;