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
  var {type,tag,page,limit,sort} = req.body;
  let sorts = ['recommend','time','rank'];
  sort = sort || sorts[0];
  type = type || 'movie';
  tag = encodeURIComponent(tag || '热门');
  const page_limit = limit || 30;
  const page_start = ((page - 1) || 0) * page_limit;
  const url = `https://movie.douban.com/j/search_subjects?sort=${sort}&type=${type}&tag=${tag}&page_limit=${page_limit}&page_start=${page_start}`;
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
    return resp.status(statusCode).json({tag:decodeURIComponent(tag),visuals,page,limit,sorts});
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
  const url = `https://m.douban.com/movie/celebrity/${cast_id}`;
  // const url = `https://movie.douban.com/celebrity/${cast_id}`;
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
    resp.status(statusCode).json({
      cast_id,
      infos,
      name: $('h1.title').text(),
      poster: $('#celebrity img').attr('src'),
      intro: $('.celebrity-intro p').text().trim()
    });
  });
}