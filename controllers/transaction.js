var Transaction = require('../models/transaction');

exports.transaction_list = function(req, res) {
    Transaction.find({}).sort('-date').exec(function(err, transactions) {
        handleError(res, err);
        res.json(transactions);
    });
};
exports.transaction_new = function(req, res) {
    const newTransaction = new Transaction(req.body);
    newTransaction.save(function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

exports.transaction_update = function(req, res) {
    let updateTransaction = req.body;
    updateTransaction.update_at = new Date();
    Transaction.findOneAndUpdate({_id: req.params.id}, updateTransaction, {upsert: true}, function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}