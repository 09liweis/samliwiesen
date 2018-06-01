var Place = require('../models/place');
var Transaction = require('../models/transaction');

exports.place_list = function(req, res) {
    Place.find({}).exec(function(err, places) {
        res.json(places);
    });
};

exports.place_detail = async function(req, res) {
    const p = await Place.findById(req.params.id);
    
};