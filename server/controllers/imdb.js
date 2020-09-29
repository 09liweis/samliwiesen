const {sendRequest,getCheerio} = require('../helpers/request');

exports.getImdbBoxOffice = (req,resp) => {
  resp.status(200).json({ok:1});
}