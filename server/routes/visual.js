const express = require('express');
const router = express.Router();

const VisualController = require('../controllers/visual.js');

router.route('/search').post(VisualController.search);

router.route('/celebrities').post(VisualController.getCelebrities);

router.route('/summary').post(VisualController.getSummary);

router.route('/photos').post(VisualController.getPhotos);

router.route('/photo').post(VisualController.getPhoto);

router.route('/comments').post(VisualController.getComments);

module.exports = router;