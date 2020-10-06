const express = require('express');
const router = express.Router();

const VisualController = require('../controllers/visual.js');
const {getImdbBoxOffice} = require('../controllers/imdb.js');

router.route('/search').post(VisualController.search);

router.route('/in_theatre').post(VisualController.inTheatre);

router.route('/celebrities').post(VisualController.getCelebrities);

router.route('/summary').post(VisualController.getSummary);

router.route('/photos').post(VisualController.getPhotos);

router.route('/photo').post(VisualController.getPhoto);

router.route('/comments').post(VisualController.getComments);

router.route('/reviews').post(VisualController.getReviews);

router.route('/imdb_boxoffice').post(getImdbBoxOffice);

module.exports = router;