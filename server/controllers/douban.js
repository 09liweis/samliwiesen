const {sendRequest} = require('../helpers/request');

exports.getSubjects = (req, resp) => {
  var {type,tag} = req.body;
  if (!type) {
    type = 'movie';
  }
  if (!tag) {
    tag = encodeURIComponent('热门')
  }
  const url = `https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=50&page_start=0`;
  sendRequest(url,'GET', resp, (statusCode,$,body) => {
    console.log(body);
    return resp.status(statusCode).json(body);
  })
}