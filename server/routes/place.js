var express= require('express');
var router = express.Router();

const {getList,updateRandom,upsert,getDetail} = require('../controllers/place.js');

router.route('/')
.get(getList)
.post(upsert);

router.route('/update_random').get(updateRandom);

router.route('/:id')
.get(getDetail);

module.exports = router;