var Place = require('../models/place');
var Transaction = require('../models/transaction');

exports.place_list = (req, res) => {
	Place.find({}, '_id place_id name address lat lng').sort('-updated_at').exec((err, places) => {
		if (err) return res.json(err);
		res.json(places);
	});
};

exports.place_detail = async function(req, res) {
	const p = await Place.findById(req.params.id);
	const transactions = await Transaction.find({place: p._id});
	p.transactions = transactions
	res.json(p);
};
exports.place_upsert = async function(req, res) {
	const place = {
		place_id:req.body.place_id,
		name:req.body.name,
		address:req.body.address,
		lat:req.body.lat,
		lng:req.body.lng,
	}
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
	res.status(200).json(p);
};