var express= require('express');
var router = express.Router();

const PlaceController = require('../controllers/place.js');

router.route('/')
.get(PlaceController.place_list)
.post(PlaceController.place_upsert);

router.route('/update_random').get(PlaceController.place_update_random);

router.route('/:id')
.get(PlaceController.place_detail);

router.route('/search_google')
.post(PlaceController.search_google);

module.exports = router;