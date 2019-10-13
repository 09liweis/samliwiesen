var Transaction = require('../models/transaction');
var Place = require('../models/place');

exports.transaction_list = (req, res) => {
  let filter = {};
  const category = req.query.category;
  const date = req.query.date;
  const place_id = req.query.place_id;
  if (date) {
    filter.date = new RegExp(date, 'i');
  }
  if (category) {
    filter.category = category;
  }
  if (place_id) {
    filter.place = place_id;
  }
  Transaction.find(filter, '_id title price date category').populate('place', '_id name address lat lng').sort('-date').exec((err, transactions) => {
    handleError(res, err);
    res.status(200).json(transactions);
  });
};

exports.category_list = (req, res) => {
	Transaction.distinct('category', (err, categories) => {
		handleError(res, err);
		res.json(categories);
	});
};
exports.transaction_new = async function(req, res) {
    const place = req.body.place;
    let p = await Place.findOne({place_id: place.place_id});
    if (!p) {
        p = Place(place);
        await p.save();
    } else {
        p.name = place.name;
        p.address = place.address;
        p.lat = place.lat;
        p.lng = place.lng;
        await Place.findOneAndUpdate({_id: p._id}, p, {upsert: true});
    }
    const newTransaction = new Transaction({
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        category: req.body.category,
        place: p._id
    });
    newTransaction.save(function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

exports.transaction_detail = function(req, res) {
    const id = req.params.id;
    // Transaction.findOne()
};

exports.transaction_update = async function(req, res) {
    const place = req.body.place;
    let p = await Place.findOne({place_id: place.place_id});
    if (!p) {
        p = Place(place);
        await p.save();
    } else {
        p.name = place.name;
        p.address = place.address;
        p.lat = place.lat;
        p.lng = place.lng;
        await Place.findOneAndUpdate({_id: p._id}, p, {upsert: true});
    }
    let updateTransaction = {
        title: req.body.title,
        price: req.body.price,
        date: req.body.date,
        category: req.body.category,
        place: p._id
    };
    updateTransaction.update_at = new Date();
    Transaction.findOneAndUpdate({_id: req.params.id}, updateTransaction, {upsert: true}, function(err, transaction) {
        handleError(res, err);
        res.json(transaction);
    });
};

exports.transaction_delete = (req, res) => {
    //Delete transaction
    Transaction.remove({_id: req.params.id}, (err) => {
        handleError(res, err);
        res.json({ok:1,msg:'Transaction Deleted'});
    });
};

function handleError(res, err) {
    if (err) {
        res.send(err);
        return;
    }
}