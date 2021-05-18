const {sendRequest, sendResp, sendErr} = require('../helpers/request');
const {getDoubanUrl,getReviews,getComments,getCast} = require('../helpers/douban');

const MISSING_DOUBAN_ID = 'Missing Douban Id';

exports.getBilibili = (req,resp) => {
  const url = 'https://api.bilibili.com/x/space/arc/search?mid=19524235&ps=30&tid=0&pn=1&keyword=&order=pubdate&jsonp=jsonp';
  sendRequest({url},(err,{statusCode,body}) => {
    console.log(body);
    return sendResp(resp,body);
  });
}