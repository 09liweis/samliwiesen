const https = require('https');
var Place = require('../models/place');
var Transaction = require('../models/transaction');
const API_KEY = 'AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos';
const PLACE_DETAIL_API = 'https://maps.googleapis.com/maps/api/place/details/json?key='+API_KEY+'&place_id=';

exports.place_update_random = async (req,res) =>{
	const count = await Place.count();
	var random = Math.floor(Math.random() * count)
	Place.findOne().skip(random).exec((err,p)=>{
		https.get(PLACE_DETAIL_API+p.place_id,(resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', async () => {
				const ret = JSON.parse(data);
				if (ret.status == 'OK') {
					const result = ret.result;
					if (result.rating) {
						p.rating = result.rating;
					}
				}
				await Place.findOneAndUpdate({_id: p._id}, p, {upsert: true});
				res.send(p);
			});
		}).on("error", (err) => {
			console.log("Error: " + err.message);
		});
	});
};

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