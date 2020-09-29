var request = require('request');

const headers = {
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'Accept-Charset': 'utf-8, iso-8859-1;q=0.5',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36'
};

exports.sendRequest = (url,method,resp,cb) => {
  var opt = {url,method,headers};
  if (method == 'POST'){
    // opt.json = {douban_id}
    // json:{
    //   douban_id
    // }
    //for post method
  }
  request(opt, function (error, response, body) {
    var statusCode = 200;
    if (response) {
      statusCode = response.statusCode;
    }
    if (error || statusCode != 200) {
      return resp.status(statusCode).json(error);
    }
    return cb(statusCode,body);
  });
}