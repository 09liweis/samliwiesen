const {sendRequest} = require('../helpers/request');

exports.getTags = (req, resp) => {
  
}

exports.getSubjects = (req, resp) => {
  var {type,tag,page,limit} = req.body;
  if (!type) {
    type = 'movie';
  }
  tag = encodeURIComponent(tag || '热门');
  const page_limit = limit || 30;
  const page_start = ((page - 1) || 0) * page_limit;
  const url = `https://movie.douban.com/j/search_subjects?type=${type}&tag=${tag}&page_limit=${page_limit}&page_start=${page_start}`;
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
    return resp.status(statusCode).json({tag:decodeURIComponent(tag),visuals,page,limit});
  })
}