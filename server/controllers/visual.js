const {sendRequest, sendResp, sendErr} = require('../helpers/request');
const {getDoubanUrl,getReviews,getComments,getCast} = require('../helpers/douban');
const {getImdbSummary} = require('../helpers/imdb');

const MISSING_DOUBAN_ID = 'Missing Douban Id';

exports.inTheatre = (req,resp) => {
  let {city} = req.body;
  city = city.trim();
  if (!city) {
    city = 'guangzhou';
  }
  const url = `https://movie.douban.com/cinema/nowplaying/${city}/`;
  sendRequest({url},function(err,{statusCode,$}) {
    const listItems = $('.list-item');
    var movies = [];
    if (listItems) {
      dataNames = ['title','release','actors','director','score','duration','category'];
      for (let i = 0; i < listItems.length; i++) {
        const item = $(listItems[i]);
        var movie = {
          douban_id: item.attr('id'),
          poster: item.find('img').attr('src'),
        };
        dataNames.forEach(name => {
          movie[name] = item.attr(`data-${name}`);
        });
        movies.push(movie);
      }
    }
    sendResp(resp,{city,movies});
  });
}

exports.search = (req, resp) => {
  let {keyword} = req.body;
  keyword = keyword.trim();
  if (!keyword) {
    return resp.status(400).json({msg:'No Keyword'});
  }
  const url = `https://m.douban.com/search/?query=${encodeURIComponent(keyword)}&type=movie`;
  sendRequest({url},function(err,{statusCode,$,body}) {
    const results = $('.search_results_subjects a');
    let visuals = [];
    if (results) {
      for (let i = 0; i < results.length; i++) {
        const visual = $(results[i]);
        const [a,movie,subject,douban_id,b] = visual.attr('href').split('/');
        visuals.push({
          douban_id,
          poster: visual.find('img').attr('src'),
          name: visual.find('.subject-title').text(),
          rating: visual.find('.rating span:nth-child(2)').text()
        });
      }
    }
    sendResp(resp,{keyword,visuals});
  });
}

exports.getCelebrities = (req,resp)=>{
  const {douban_id} = req.body
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'celebrities'});
  sendRequest({url:douban_url},function(err,{statusCode,$,body}) {
    const castsMatch = $('.list-wrapper');
    let casts = [];
    for (let i = 0; i < castsMatch.length; i++) {
      const castSection = $(castsMatch[i]);
      let castTl = castSection.find('h2').text()
      const celebritiesMatch = castSection.find('.celebrity');
      let celebrities = [];
      for (let j = 0; j < celebritiesMatch.length; j++) {
        const celebrity = $(celebritiesMatch[j]);
        celebrities.push(getCast(celebrity,$));
      }
      casts.push({
        tl:castTl,
        celebrities
      });
    }
    sendResp(resp,{douban_url,casts});
  });
}

exports.getPhotoDetail = (req, resp) => {
  const {photo_id} = req.body;
  if (!photo_id) {
    return resp.json({msg:'No Photo Id'});
  }
  const douban_url = `https://movie.douban.com/photos/photo/${photo_id}`;
  sendRequest({url:douban_url},(err,{statusCode,$,body}) => {
    const commentsMatch = $('.comment-item');
    let comments = [];
    const uploader = $('.poster-info li:nth-child(5) a').text();
    const upload_date = $('.poster-info li:nth-child(6)').text();
    if (commentsMatch) {
      for (let i = 0; i < commentsMatch.length; i++) {
        const comment = $(commentsMatch[i]);
        comments.push({
          pic:comment.find('img').attr('src'),
          date: comment.find('.author span').text(),
          author: comment.find('.author a').text(),
          content: comment.find('p').text()
        });
      }
    }
    sendResp(resp,{uploader,upload_date,comments});
  });
}

exports.getComments = (req, resp) => {
  const {douban_id} = req.body;
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'comments'});
  sendRequest({url:douban_url}, (err,{statusCode,$,body}) => {
    const comments = getComments($);
    return sendResp(resp,{comments});
  })
}

exports.getReviews = (req,resp) => {
  let {douban_id} = req.body;
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'reviews'});
  sendRequest({url:douban_url},(err,{statusCode,$,body}) => {
    const reviews = getReviews($);
    return sendResp(resp,{reviews});
  });
}

exports.getSummary = (req,resp)=>{
  let {douban_id} = req.body;
  if (douban_id) {
    douban_id = douban_id.trim();
  }
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  douban_url = getDoubanUrl(douban_id);
  sendRequest({url:douban_url},function(err,{statusCode,$,body}) {
    const title = $('span[property="v:itemreviewed"]').text();
    const douban_poster = $('img[rel="v:image"]').attr('src');
    const douban_rating = $('strong[property="v:average"]').text() || 0;
    const summary = $('span[property="v:summary"]').text().trim();
    const douban_vote_count = $('span[property="v:votes"]').text();

    const genresMatch = $('span[property="v:genre"]');
    if (genresMatch) {
      var genres = genresMatch.toArray().map(g => $(g).text());
    }

    const recommendsMatch = $('.recommendations-bd dl');
    if (recommendsMatch) {
      var recommends = [];
      for (var i = 0; i < recommendsMatch.length; i++) {
        var recommend = $(recommendsMatch[i]);
        recommends.push({
          img: recommend.find('dt img').attr('src'),
          title: recommend.find('dd a').text(),
          url: recommend.find('dd a').attr('href')
        });
      }
    }

    const comments = getComments($);

    const photosMatch = $('.related-pic-bd li');
    if (photosMatch) {
      var photos = [];
      photosMatch.toArray().forEach((item) => {
        const media = $(item);
        let tp = 'photo';
        let src = media.find('img').attr('src');
        let href = media.find('a').attr('href');
        if (media.attr('class') == 'label-trailer') {
          tp = 'trailer';
          var imgStyle = media.find('a').attr('style');
          var imgMatches = /url\((.*?)\)/g.exec(imgStyle);
          if (imgMatches) {
            src = imgMatches[1];
          }
        }
        photos.push({tp,src,href});
      })
    }

    const awardsMatch = $('.award');
    if (awardsMatch) {
      var awards = [];
      awardsMatch.toArray().forEach((item)=>{
        const award = $(item);
        awards.push({
          nm: award.find('li:first-child a').text(),
          award: award.find('li:nth-child(2)').text()
        });
      })
    }

    const reviews = getReviews($);

    const castMatches = $('.celebrity');
    if (castMatches) {
      var casts = []
      for(var i = 0; i < castMatches.length; i++) {
        var cast = $(castMatches[i]);
        casts.push(getCast(cast,$));
      }
    }

    var websiteMatch = /官方网站:<\/span>(.*?)<br\/>/g.exec(body);
    if (websiteMatch) {
      var website = $(websiteMatch[1]).text().trim();
      if (website.indexOf('http') == -1) {
        website = `http://${website}`;
      }
    }
    var originalTitleMatch = /又名:<\/span>(.*?)<br\/>/g.exec(body);
    if (originalTitleMatch) {
      var original_title = originalTitleMatch[1].trim();
    }

    var episodesMatch = /集数:<\/span>(.*?)<br\/>/g.exec(body);
    let episodes = 1;
    if (episodesMatch) {
      episodes = parseInt(episodesMatch[1].trim());
    }

    var durationMatch = /单集片长:<\/span>(.*?)<br\/>/g.exec(body);
    let duration = $('span[property="v:runtime"]').attr('content');
    if (durationMatch) {
      duration = durationMatch[1].trim();
      if (/分钟/.test(duration)) {
        duration = duration.replace('分钟','');
      }
    }

    var langsMatch = /语言:<\/span>(.*?)<br\/>/g.exec(body);
    if (langsMatch) {
      var languages = langsMatch[1].trim().split(' / ');
    }

    var countryMatch = /制片国家\/地区:<\/span>(.*?)<br\/>/g.exec(body);
    if (countryMatch) {
      var countries = countryMatch[1].trim().split(' / ');
    }

    const imdbMatches = body.match(/tt[\d]{7,8}/g);
    let imdb_id = '';
    if (imdbMatches && imdbMatches.length > 0) {
      imdb_id = imdbMatches[0];
    }

    const dateMatches = body.match(/[\d]{4}-[\d]{2}-[\d]{2}\([\u4e00-\u9fff]+\)/g);
    let dates = [];
    for (let i in dateMatches) {
      if (dates.indexOf(dateMatches[i]) == -1 ) {
        dates.push(dateMatches[i]);
      }
    }

    visual = {
      douban_id,
      douban_url,
      title,
      original_title,
      douban_poster,
      douban_rating,
      douban_vote_count,
      genres,
      website,
      duration,
      episodes,
      visual_type: (episodes > 1) ? 'tv' : 'movie',
      photos,
      awards,
      languages,
      countries,
      summary,
      casts,
      release_dates:dates,
      recommends,
      reviews,
      comments,
      imdb_id,
    };
    if (!imdb_id) {
      return sendResp(resp,visual);
    }
    //handle scraping imdb data
    getImdbSummary(imdb_id, (err, imdbObj) => {
      visual = Object.assign(visual,imdbObj);
      return sendResp(resp,visual);
    })
  });
}