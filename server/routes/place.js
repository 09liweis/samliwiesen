var express= require('express');
var router = express.Router();

const PlaceController = require('../controllers/place.js');

router.route('/')
.get(PlaceController.place_list)
.post(PlaceController.place_upsert);

router.route('/:id')
.get(PlaceController.place_detail);

module.exports = router;