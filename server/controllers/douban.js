const {sendRequest} = require('../helpers/request');

exports.getSubjects = (req, resp) => {
  var {type,tag,page_start} = req.body;
  if (!type) {
    type = 'movie';
  }
  if (!tag) {
    tag = encodeURIComponent('热门');
  } else {
    tag = encodeURIComponent(tag);
  }
  if (!page_start) {
    page_start = 0;
  }
  const url = `https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=50&page_start=${page_start}`;
  sendRequest(url,'GET', resp, (statusCode,$,body) => {
    var visuals = JSON.parse(body).subjects;
    for (let i = 0; i < visuals.length; i++) {
      const {cover,rate,id} = visuals[i];
      visuals[i].poster = cover;
      visuals[i].douban_rating = rate;
      visuals[i].douban_id = id;
      delete visuals[i].cover;
      delete visuals[i].rate;
      delete visuals[i].id;
    }
    return resp.status(statusCode).json({tag:decodeURIComponent(tag),visuals,page_start});
  })
}