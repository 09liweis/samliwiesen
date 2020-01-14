const User = require('../models/user');

exports.list = (req, res) => {
	User.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, users) => {
		handleError(res, err);
		res.json(users);
	});
};
exports.add = (req,res)=>{
	res.json(req.body);
}
function handleError(res, err) {
	if (err) {
		res.send(err);
	}
}