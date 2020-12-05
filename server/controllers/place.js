const https = require('https');
var request = require('request');
var ObjectID = require('mongodb').ObjectID
var Place = require('../models/place');
var Transaction = require('../models/transaction');
const API_KEY = 'AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos';
const PLACE_DETAIL_API = 'https://maps.googleapis.com/maps/api/place/details/json?key='+API_KEY+'&place_id=';

exports.updateRandom = async (req,res) =>{
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
          if (result.name) {
            p.name = result.name;
          }
          if (result.icon) {
            p.icon = result.icon;
          }
          if (result.photos) {
            let photos = [];
            for (let pho of result.photos) {
              const photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth='+pho.width+'&photoreference='+pho.photo_reference+'&key='+API_KEY
              photos.push(photo);
            }
            p.photos = photos;
          }
          if (result.types) {
            p.types = result.types;
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

exports.getList = (req, res) => {
  Place.find({}, '_id place_id icon name address lat lng rating photos types').sort('-created_at').exec((err, places) => {
    if (err) return res.json(err);
    res.status(200).json(places);
  });
};

exports.getDetail = async function(req, res) {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(200).json({msg:'Place Id is not valid'});
  }
  const p = await Place.findById(req.params.id);
  if (!p) {
    return res.status(200).json({msg:'No Place Found'});
  }
  const transactions = await Transaction.find({place: p._id},'_id title price date category');
  p.transactions = transactions
  res.status(200).json(p);
};
exports.upsert = async function(req, res) {
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

const headers = {
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
};

//https://developers.google.com/places/web-service/search#PlaceSearchRequests
exports.search_google = async function(req, res) {
  const {name,lat,lng} = req.body
  //&radius=1500&type=restaurant
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50000&name=${encodeURIComponent(name)}&key=${API_KEY}`;
  console.log(url);
  request({
    url,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    const {statusCode} = response;
    if (!error && statusCode == 200) {
      const results = JSON.parse(body);
      console.log(statusCode);
      return res.status(statusCode).send(results);
    } else {
      res.status(200).json({ok:1});
    }
  });
}