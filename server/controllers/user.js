const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.list = (req, res) => {
  User.find({}, '_id title url content image category published created_at').sort('-created_at').exec((err, users) => {
    handleError(res, err);
    res.json(users);
  });
};
exports.register = async (req,res)=>{
  const {eml,nm,pwd} = req.body;
  let user = await User.findOne({eml})
  let msg = 'ok';
  if (user) {
    msg = 'Email is taken';
    return res.status(400).json({msg});
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(pwd,salt);
    user = new User({
      eml,
      nm,
      pwd: hashPassword,
      lts: new Date()
    });
    await user.save()
    msg = 'Register done'
    res.status(200).json({msg});
  }
}
exports.login = (req, resp) => {
  const {eml,nm,pwd} = req.body;
  
}
function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}