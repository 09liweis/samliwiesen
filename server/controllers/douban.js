const {sendRequest} = require('../helpers/request');
const {getDoubanUrl,DOUBAN_SITE_API} = require('../helpers/douban');

const SORTS = ['recommend','time','rank'];

exports.getTags = (req, resp) => {
  var {type} = req.body;
  if (!type) {
    type = 'movie';
  }
  const url = `${DOUBAN_SITE_API}search_tags?type=${type}&source=`;
  sendRequest(url,'GET',resp,(statusCode,$,body) => {
    var tags = JSON.parse(body).tags;
    resp.status(statusCode).json({type,tags,sorts:SORTS});
  });
}

exports.getSubjects = (req, resp) => {
  var {type,tag,page,limit,sort} = req.body;
  
  sort = sort ||SORTS[0];
  type = type || 'movie';
  tag = encodeURIComponent(tag || '热门');
  const page_limit = limit || 30;
  const page_start = ((page - 1) || 0) * page_limit;
  const url = `${DOUBAN_SITE_API}search_subjects?sort=${sort}&type=${type}&tag=${tag}&page_limit=${page_limit}&page_start=${page_start}`;
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
  type = type || 'S';
  page = page || 1;
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

exports.getCast = (req, resp) => {
  const {cast_id} = req.body;
  // const url = `https://m.douban.com/movie/celebrity/${cast_id}`;
  const url = `https://movie.douban.com/celebrity/1006332/`;
  sendRequest(url,'GET',resp,(statusCode,$,body) => {
    const infoMatch = $('.more-info.list li');
    const infos = {};
    if (infoMatch) {
      for (let i = 0; i < infoMatch.length; i++) {
        const info = $(infoMatch[i]);
        const key = info.find('.key').text();
        const val = info.find('span:last-child').text();
        infos[key] = val;
      }
    }
    const photosMatch = $('#photos li a');
    if (photosMatch) {
      var photos = [];
      for (let i = 0; i < photosMatch.length; i++) {
        const photo = $(photosMatch[i]);
        photos.push({
          thumb: photo.find('img').attr('src')
        });
      }
    }
    const receWorksMatch = $('#recent_movies .list-s li');
    if (receWorksMatch) {
      var recent_works = [];
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
      name: $('h1.title').text(),
      poster: $('#headline .pic a img').attr('src'),
      intro: $('.celebrity-intro p').text().trim(),
      photos,
      recent_works
    });
  });
}