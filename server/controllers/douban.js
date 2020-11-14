const {sendRequest} = require('../helpers/request');
const {getDoubanUrl} = require('../helpers/douban');

exports.getTags = (req, resp) => {
  var {type} = req.body;
  if (!type) {
    type = 'movie';
  }
  const url = `https://movie.douban.com/j/search_tags?type=${type}&source=`;
  sendRequest(url,'GET',resp,(statusCode,$,body) => {
    var tags = JSON.parse(body).tags;
    resp.status(statusCode).json({type,tags});
  });
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

exports.getPhotos = (req,resp) => {
  //type S -> 剧照, R -> Poster
  const types = {
    S:'剧照',
    R:'海报',
    W:'壁纸'
  }
  var limit = 30;
  var {douban_id,page,type} = req.body;
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  if (!type) {
    type = 'S';
  }
  if (!page) {
    page = 1
  }
  var douban_url = `${getDoubanUrl(douban_id,{apiName:'photos'})}?type=${type}`;
  douban_url += `&start=${(page - 1)*limit}`;
  sendRequest(douban_url, 'GET', resp, (statusCode, $) => {
    const photosMatch = $('.poster-col3 li');
    const title = $('#content h1').text();
    var photos = [];
    if (!page) {
      page = 1;
    }
    if (photosMatch) {
      for (let i = 0; i < photosMatch.length; i++) {
        const photo = $(photosMatch[i]);
        const href = photo.find('a').attr('href').split('/');
        if (href && href.length > 5) {
          var photo_id = href[5];
        }
        photos.push({
          thumb: photo.find('img').attr('src'),
          origin: `https://img9.doubanio.com/view/photo/l/public/p${photo_id}.jpg`,
          name: photo.find('.name').text().trim(),
          prop: photo.find('.prop').text().trim(),
          photo_id
        })
      }
    }
    resp.status(statusCode).json({title,photos,types,page,type});
  });
}