var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {
    res.status(200).json('Resume site comming soon');
});

// router.route('/dashboard').get(function(req, res) {
//     res.status(200).json('Resume site comming soon');
// });

module.exports = router;