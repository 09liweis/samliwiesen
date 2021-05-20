const {sendRequest, sendResp, sendErr} = require('../helpers/request');

exports.getMaoyan = (req,resp) => {
  const url = 'https://piaofang.maoyan.com/dashboard-ajax';
  sendRequest({url},(err,{statusCode,body}) => {
    try {
      var ret = JSON.parse(body);
    } catch (error) {
      var ret = {};
    }
    console.log(ret);
    return sendResp(resp,ret);
  });
}