const User = require('../models/user');
const bcrypt = require('bcrypt');
const {sign} = require('../helpers/verifyToken');

exports.list = (req, res) => {
  User.find({}, '_id eml lts created_at').sort('-created_at').exec((err, users) => {
    handleError(res, err);
    res.json(users);
  });
};
exports.register = async (req,resp)=>{
  const {eml,nm,pwd} = req.body;
  let user = await User.findOne({eml})
  let msg = 'ok';
  if (user) {
    msg = 'Email is taken';
    return resp.status(400).json({msg});
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
    const token = sign({_id:user._id});
    resp.header('auth-token',token);
    resp.status(200).json({msg});
  }
}
exports.login = async (req, resp) => {
  const {eml,pwd} = req.body;
  let user = await User.findOne({eml},'_id pwd');
  if (!user) {
    return resp.status(400).json({msg:'Email does not exist'});
  }
  const isValidPwd = await bcrypt.compare(pwd,user.pwd);
  if (!isValidPwd) {
    return resp.status(400).json({msg:'Password not correct'});
  }
  const token = sign({_id:user._id});
  resp.header('auth-token',token);
  resp.status(200).json({msg:'Login'});
}
exports.detail = async (req,resp) => {
  let user = req.user;
  if (user) {
    user = await User.findOne({_id:user._id},'nm eml lts')
    resp.status(200).json({user}); 
  }
}
function handleError(res, err) {
  if (err) {
    res.send(err);
  }
}