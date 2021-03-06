const {sendRequest, sendResp, sendErr} = require('../helpers/request');

exports.getBilibili = (req,resp) => {
  const userId = '19524235';
  const url = `https://api.bilibili.com/x/space/arc/search?mid=${userId}&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp`;
  sendRequest({url},(err,{body}) => {
    try {
      var ret = JSON.parse(body);
    } catch (error) {
      var ret = {};
    }
    var bVideos = [];
    if (ret.data) {
      bVideos = ret.data.list.vlist;
    }
    return sendResp(resp,bVideos);
  });
}