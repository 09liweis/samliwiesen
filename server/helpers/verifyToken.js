const jwt = require('jsonwebtoken');
const {token_secret} = require('./constant');

exports.verify = (req,resp,next) => {
  const token = req.header('auth-token');
  if (!token) {
    return resp.status(400).json({msg:'Access Denied'});
  }
  try {
    const verified = jwt.verify(token, token_secret);
    console.log('jwt verified',verified);
    req.user = verified;
    return next();
  } catch (error) {
    resp.status(400).json({msg:'Invalid token'});
  }
}
exports.sign = (data) => {
  const token = jwt.sign(data,token_secret);
  return token;
}