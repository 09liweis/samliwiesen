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
exports.login = async (req, resp) => {
  const {eml,pwd} = req.body;
  let user = await User.findOne({eml},'_id nm eml pwd lts');
  if (!user) {
    return resp.status(400).json({msg:'Email does not exist'});
  }
  const isValidPwd = await bcrypt.compare(pwd,user.pwd);
  if (!isValidPwd) {
    return resp.status(400).json({msg:'Password not correct'});
  }
  delete user.pwd;
  resp.status(200).json({data:user});
}
function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}