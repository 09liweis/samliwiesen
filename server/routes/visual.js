const express = require('express');
const router = express.Router();

const VisualController = require('../controllers/visual.js');
const {getImdbBoxOffice} = require('../controllers/imdb.js');
const {getSubjects,getTags,getPhotos,getCast} = require('../controllers/douban.js');

router.route('/search').post(VisualController.search);

router.route('/in_theatre').post(VisualController.inTheatre);

router.route('/celebrities').post(VisualController.getCelebrities);

router.route('/cast').post(getCast);

router.route('/summary').post(VisualController.getSummary);

router.route('/photos').post(getPhotos);

router.route('/photo').post(VisualController.getPhotoDetail);

router.route('/comments').post(VisualController.getComments);

router.route('/reviews').post(VisualController.getReviews);

router.route('/imdb_boxoffice').post(getImdbBoxOffice);

router.route('/douban').post(getSubjects);

router.route('/douban/tags').post(getTags);

module.exports = router;