var express= require('express');
var router = express.Router();

const {getList,update_random,upsert,getDetail,search_google} = require('../controllers/place.js');

router.route('/')
.get(getList)
.post(upsert);

router.route('/update_random').get(update_random);

router.route('/:id')
.get(getDetail);

router.route('/search_google')
.post(search_google);

module.exports = router;