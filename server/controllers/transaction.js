var Transaction = require('../models/transaction');
var Place = require('../models/place');

exports.transaction_list = (req, res) => {
  let filter = {};
  const {category,date,place_id,limit,page} = req.body;
  let opt = {limit:30};
  if (limit) {
    if (limit != 'all') {
      opt.limit = parseInt(limit);
    } else {
      delete opt.limit;
    }
  }
  if (page) {
    opt.skip = parseInt(page)*opt.limit;
  }
  if (category) {
    filter.category = category;
  }
  if (place_id) {
    filter.place = place_id;
  }
  if (date) {
    filter.date = new RegExp(date, 'i');
  }
  Transaction.find(filter, '_id title price date category',opt).populate('place', '_id name address lat lng').sort('-date').exec((err, transactions) => {
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
upsertTransaction = async (req,res) =>{
  transactionData = {
    price: req.body.price,
    date: req.body.date,
    category: req.body.category
  };
  const title = req.body.title;
  if (title) {
    transactionData.title = title;
  }
  const place = req.body.place;
  let p;
  if (typeof place != 'undefined') {
    p = await Place.findOne({place_id: place.place_id});
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
    transactionData.place = p._id;
  }
  let transaction;
  console.log(transactionData);
  if (req.params.id) {
    transaction = transactionData;
    transaction.update_at = new Date();
    Transaction.findOneAndUpdate({_id: req.params.id}, transaction, {returnNewDocument: true,upsert: true},(err, t)=>{
      console.error(err);
      t.place = p;
      res.json(t);
    });
  } else {
    transaction = new Transaction(transactionData);
    transaction.save(function(err, t) {
      handleError(res, err);
      t.place = p;
      console.log('return', t);
      res.json(t);
    });
  }
}
exports.transaction_new = (req, res) => {
  upsertTransaction(req,res);
};

exports.transaction_update = (req, res) => {
  upsertTransaction(req,res);
};

exports.transaction_detail = async function(req, res) {
  const id = req.params.id;
  const t = await Transaction.findById(id).populate('place', '_id place_id name address lat lng');
  res.json(t);
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