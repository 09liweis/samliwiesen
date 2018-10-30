var Place = require('../models/place');
var Transaction = require('../models/transaction');

exports.place_list = (req, res) => {
    Place.find({}, '_id name address lat lng').exec((err, places) => {
        res.json(places);
    });
};

exports.place_detail = async function(req, res) {
    const p = await Place.findById(req.params.id);
    const transactions = await Transaction.find({place: p._id});
    const result = {
        place: p,
        transactions: transactions
    };
    res.json(result);
};