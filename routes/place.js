var express= require('express');
var router = express.Router();

const PlaceController = require('../controllers/place.js');

router.route('/')
.get(PlaceController.place_list);

module.exports = router;