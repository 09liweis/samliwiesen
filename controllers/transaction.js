var Transaction = require('../models/transaction');
var Place = require('../models/place');

exports.transaction_list = function(req, res) {
    Transaction.find({}).sort('-date').exec(function(err, transactions) {
        handleError(res, err);
        res.json(transactions);
    });
};
exports.transaction_new = async function(req, res) {
    const place = req.body.place;
    let p = await Place.findOne({place_id: place.place_id});
    if (!p) {
        p = Place(place);
        await p.save();
        
        console.log('add place');
    } else {
        console.log('place exist');
    }
    const newTransaction = new Transaction({
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        place: p._id
    });
    newTransaction.save(function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

exports.transaction_detail = function(req, res) {
    
};

exports.transaction_update = function(req, res) {
    const p = getPlace(req.body.place);
    let updateTransaction = {
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        place: p._id
    };
    updateTransaction.update_at = new Date();
    Transaction.findOneAndUpdate({_id: req.params.id}, updateTransaction, {upsert: true}, function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

exports.transaction_delete = function(req, res) {
    Transaction.remove({_id: req.params.id}, function(err) {
        handleError(res, err);
        res.json('ok');
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
    }
}

async function getPlace(place) {
    let p = await Place.findOne({place_id: place.place_id});
    if (!p) {
        p = Place(place);
        await p.save();
        
        console.log('add place');
    }
    return p;
}