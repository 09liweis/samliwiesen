var express= require('express');
var router = express.Router();

const PlaceController = require('../controllers/place.js');

router.route('/')
.get(PlaceController.experience_list);

module.exports = router;