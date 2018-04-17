var Transaction = require('../models/transaction');

exports.transaction_list = function(req, res) {
    Transaction.find({}).sort('-created_at').exec(function(err, transactions) {
        handleError(res, err);
        res.json(transactions);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}