var Place = require('../models/place');

exports.place_list = function(req, res) {
    Place.find({}).exec(function(err, places) {
        res.json(places);
    });
};