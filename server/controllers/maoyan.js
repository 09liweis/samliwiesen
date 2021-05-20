//Blocked by maoyan
const {sendRequest, sendResp, sendErr} = require('../helpers/request');

exports.getMaoyan = (req,resp) => {
  const url = 'https://piaofang.maoyan.com/dashboard-ajax';
  sendRequest({url},(err,{statusCode,body}) => {
    try {
      var ret = JSON.parse(body);
    } catch (error) {
      var ret = {};
    }
    var maoyan = {};
    var {movieList} = ret;
    if (movieList) {
      maoyan.movies = movieList.data.list;
    }
    return sendResp(resp,maoyan);
  });
}