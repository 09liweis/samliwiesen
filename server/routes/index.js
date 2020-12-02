var express = require('express');
var router = express.Router();

router.route('/').get(function(req, res) {
  res.status(200).json('Resume site comming soon');
});

router.route('/movie/:id').get((req,resp) => {
  let douban_id = req.params.id;
  resp.json('movie detail '+douban_id);
});

module.exports = router;