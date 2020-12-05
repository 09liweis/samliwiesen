var express= require('express');
var router = express.Router();

const {place_list,update_random,place_upsert,getDetail,search_google} = require('../controllers/place.js');

router.route('/')
.get(place_list)
.post(place_upsert);

router.route('/update_random').get(update_random);

router.route('/:id')
.get(getDetail);

router.route('/search_google')
.post(search_google);

module.exports = router;