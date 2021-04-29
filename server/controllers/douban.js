const {sendRequest} = require('../helpers/request');
const {getDoubanUrl,DOUBAN_SITE_API,getPhotos} = require('../helpers/douban');

const CAST_DOUBAN_URL = 'https://movie.douban.com/celebrity/';
const SORTS = ['recommend','time','rank'];

const NUM_LIMIT = 30;

exports.getTags = (req, resp) => {
  var {type} = req.body;
  type = type || 'movie';
  const url = `${DOUBAN_SITE_API}search_tags?type=${type}&source=`;
  sendRequest({url},(err,{statusCode,$,body}) => {
    var tags = JSON.parse(body).tags;
    resp.status(statusCode).json({type,tags,sorts:SORTS});
  });
}

exports.getSubjects = (req, resp) => {
  var {type,tag,page,limit,sort} = req.body;
  
  sort = sort ||SORTS[0];
  type = type || 'movie';
  tag = encodeURIComponent(tag || '热门');
  const page_limit = limit || NUM_LIMIT;
  const page_start = ((page - 1) || 0) * page_limit;
  const url = `${DOUBAN_SITE_API}search_subjects?sort=${sort}&type=${type}&tag=${tag}&page_limit=${page_limit}&page_start=${page_start}`;
    sendRequest({url}, (err,{statusCode,$,body}) => {
    var visuals = JSON.parse(body).subjects;
    for (let i = 0; i < visuals.length; i++) {
      const {cover,rate,id,episodes_info} = visuals[i];
      visuals[i].poster = cover;
      visuals[i].douban_rating = rate;
      visuals[i].douban_id = id;
      visuals[i].episodes_info = episodes_info;
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
  var {douban_id,page,type,cast_id} = req.body;
  if (!(douban_id || cast_id)) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  page = page || 1;
  if (douban_id) {
    var url = `${getDoubanUrl(douban_id,{apiName:'photos'})}`;
    type = type || 'S';
  } else if (cast_id) {
    var url = `${CAST_DOUBAN_URL}${cast_id}/photos/`;
    type = type || 'C';
  }
  url += `?type=${type}&start=${(page - 1)*NUM_LIMIT}`;
  sendRequest({url}, (err,{statusCode, $}) => {
    const title = $('#content h1').text();
    const photos = getPhotos($);
    resp.status(statusCode).json({title,photos,types,page,type});
  });
}

exports.getCast = (req, resp) => {
  const {cast_id} = req.body;
  const url = `${CAST_DOUBAN_URL}${cast_id}/`;
  sendRequest(url,'GET',resp,(statusCode,$,body) => {
    const infoMatch = $('#headline .info li');
    const infos = {};
    if (infoMatch) {
      for (let i = 0; i < infoMatch.length; i++) {
        var [key,val] = $(infoMatch[i]).text().trim().split(': ');
        infos[key] = val;
      }
    }
    const photosMatch = $('#photos li a');
    if (photosMatch) {
      var photos = [];
      for (let i = 0; i < photosMatch.length; i++) {
        const photo = $(photosMatch[i]);
        photos.push({
          src: photo.find('img').attr('src')
        });
      }
    }
    const receWorksMatch = $('#recent_movies .list-s li');
    var recent_works = [];
    if (receWorksMatch) {
      for (let i = 0; i < receWorksMatch.length; i++) {
        const work = $(receWorksMatch[i]);
        recent_works.push({
          img: work.find('.pic img').attr('src'),
          title: work.find('.info a').text(),
          rating: work.find('.info em').text()
        });
      }
    }
    resp.status(statusCode).json({
      cast_id,
      infos,
      name: $('#content h1').text(),
      poster: $('#headline .pic a img').attr('src'),
      intro: $('#intro .all.hidden').text().trim(),
      photos,
      recent_works
    });
  });
}