var express= require('express');
var router = express.Router();

const {place_list,place_update_random,place_upsert,place_detail,search_google} = require('../controllers/place.js');

router.route('/')
.get(place_list)
.post(place_upsert);

router.route('/update_random').get(place_update_random);

router.route('/:id')
.get(place_detail);

router.route('/search_google')
.post(search_google);

module.exports = router;