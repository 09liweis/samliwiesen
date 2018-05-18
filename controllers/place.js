var Place = require('../models/place');

exports.place_list = function(req, res) {
    Place.find({}).exec(function(transactions) {
        res.json(transactions);
    });
};