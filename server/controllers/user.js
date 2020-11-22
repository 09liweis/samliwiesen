const User = require('../models/user');

exports.list = (req, res) => {
  User.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, users) => {
    handleError(res, err);
    res.json(users);
  });
};
exports.register = async (req,res)=>{
  const body = req.body;
  const eml = body.eml;
  let user = await User.findOne({eml})
  let msg = 'ok';
  if (user) {
    msg = 'Email is taken';
    return res.status(400).json({msg});
  } else {
    user = new User(body);
    await user.save()
    res.status(200).json({msg});
  }
}
exports.login = (req, resp) => {
  
}
function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}