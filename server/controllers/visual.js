const {sendRequest} = require('../helpers/request');
const {getDoubanUrl} = require('../helpers/douban');

const IMDB_SITE = 'https://www.imdb.com/title/';
const MISSING_DOUBAN_ID = 'Missing Douban Id';

function getImdbUrl(imdb_id) {
  return `${IMDB_SITE}${imdb_id}`;
}

function getAvtUrl(element) {
  var avtStyle = element.find('div.avatar').attr('style');
  var avtMatches = /url\((.*?)\)/g.exec(avtStyle);
  let avt = '';
  if (avtMatches) {
    avt = avtMatches[1];
  }
  return avt;
}

function getCast(cast,$) {
  const worksMatch = cast.find('.works a');
  let works = [];
  if (worksMatch) {
    for (let i = 0; i < worksMatch.length; i++) {
      const work = $(worksMatch[i]);
      works.push({
        url: work.attr('href'),
        tl:work.attr('title')
      })
    }
  }
  return {
    name:cast.find('a.name').text(),
    avt:getAvtUrl(cast),
    role:cast.find('.role').text(),
    works
  }
}

function getVisualComments($) {
  const commentsMatch = $('.comment-item');
  var comments = [];
  if (commentsMatch) {
    for (var i = 0; i < commentsMatch.length; i++) {
      var comment = $(commentsMatch[i]);
      var rating = comment.find('.rating').attr('class');
      if (typeof rating == 'string') {
        rating = rating.replace('rating','').replace('allstar','').trim();
      }
      const text = comment.find('.short').text();
      if (text) {
        comments.push({
          text,
          author: comment.find('.comment-info a').text(),
          avt: comment.find('img').attr('src'),
          date: comment.find('.comment-time').text().trim(),
          rating,
          vote: comment.find('.votes').text()
        });
      }
    }
  }
  return comments;
}

function getVisualReviews($) {
  const reviewsMatch = $('.main.review-item');
  var reviews = [];
  if (reviewsMatch) {
    for (var i = 0; i < reviewsMatch.length; i++) {
      var review = $(reviewsMatch[i]);
      var rating = review.find('.main-title-rating').attr('class');
      if (typeof rating == 'string') {
        rating = rating.replace('main-title-rating','').replace('allstar','').trim();
      }
      reviews.push({
        title: review.find('h2 a').text(),
        content: review.find('.short-content').text(),
        author: review.find('.name').text(),
        avt: review.find('.avator img').attr('src'),
        rating,
        date: review.find('.main-meta').text(),
        usefull_count: review.find('.action-btn.up span').text().trim(),
        useless_count: review.find('.action-btn.down span').text().trim(),
        reply_count: review.find('.reply').text()
      });
    }
  }
  return reviews;
}

exports.inTheatre = (req,resp) => {
  let {city} = req.body;
  city = city.trim();
  if (!city) {
    city = 'guangzhou';
  }
  const url = `https://movie.douban.com/cinema/nowplaying/${city}/`;
  sendRequest(url,'GET',resp,function(statusCode,$,body) {
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
    resp.status(statusCode).json({city,movies});
  });
}

exports.search = (req, resp) => {
  let {keyword} = req.body;
  keyword = keyword.trim();
  if (!keyword) {
    return resp.status(400).json({msg:'No Keyword'});
  }
  const url = `https://m.douban.com/search/?query=${encodeURIComponent(keyword)}&type=movie`;
  sendRequest(url,'GET',resp,function(statusCode,$,body) {
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
    resp.status(statusCode).json({keyword,visuals});
  });
}

exports.getCelebrities = (req,resp)=>{
  const {douban_id} = req.body
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'celebrities'});
  sendRequest(douban_url,'GET',resp,function(statusCode,$,body) {
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
    resp.status(statusCode).json({douban_url,casts});
  });
}

exports.getPhotoDetail = (req, resp) => {
  const {photo_id} = req.body;
  if (!photo_id) {
    return resp.json({msg:'No Photo Id'});
  }
  const douban_url = `https://movie.douban.com/photos/photo/${photo_id}`;
  sendRequest(douban_url,'GET',resp,(statusCode,$,body) => {
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
    resp.status(statusCode).json({uploader,upload_date,comments});
  });
}

exports.getComments = (req, resp) => {
  const {douban_id} = req.body;
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'comments'});
  sendRequest(douban_url,'GET', resp, (statusCode,$,body) => {
    const comments = getVisualComments($);
    return resp.status(statusCode).json({comments});
  })
}

exports.getReviews = (req,resp) => {
  let {douban_id} = req.body;
  if (!douban_id) {
    return resp.status(400).json({msg:MISSING_DOUBAN_ID});
  }
  const douban_url = getDoubanUrl(douban_id,{apiName:'reviews'});
  sendRequest(douban_url,'GET',resp,(statusCode,$,body) => {
    const reviews = getVisualReviews($);
    return resp.status(statusCode).json({reviews});
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
  sendRequest(douban_url,'GET',resp,function(statusCode,$,body) {
    var episodes = 1;
    const title = $('span[property="v:itemreviewed"]').text();
    const douban_poster = $('img[rel="v:image"]').attr('src');
    const douban_rating = $('strong[property="v:average"]').text();
    let duration = $('span[property="v:runtime"]').attr('content');
    const summary = $('span[property="v:summary"]').text().trim();
    const douban_vote_count = $('span[property="v:votes"]').text();

    const genresMatch = $('span[property="v:genre"]');
    if (genresMatch) {
      var genres = [];
      for (let i = 0; i < genresMatch.length; i++) {
        const genre = $(genresMatch[i]);
        genres.push(genre.text());
      }
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

    const comments = getVisualComments($);

    const photosMatch = $('.related-pic-bd li');
    if (photosMatch) {
      var photos = [];
      for (let i = 0; i < photosMatch.length; i++) {
        const media = $(photosMatch[i]);
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
        photos.push({
          tp,
          src,
          href
        });
      }
    }

    const awardsMatch = $('.award');
    if (awardsMatch) {
      var awards = [];
      for (let i = 0; i < awardsMatch.length; i++) {
        const award = $(awardsMatch[i]);
        awards.push({
          nm: award.find('li:first-child a').text(),
          award: award.find('li:nth-child(2)').text()
        });
      }
    }

    const reviews = getVisualReviews($);

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
    if (episodesMatch) {
      episodes = parseInt(episodesMatch[1].trim());
    }

    var durationMatch = /单集片长:<\/span>(.*?)<br\/>/g.exec(body);
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
      return resp.status(statusCode).json(visual);
    }
    //handle scraping imdb data
    url = getImdbUrl(imdb_id);
    sendRequest(url,'GET',resp,function(statusCode,$,body) {
      visual.imdb_title = $('.title_wrapper h1').text().trim();
      visual.imdb_rating = $('span[itemprop="ratingValue"]').text();
      visual.imdb_rating_count = $('span[itemprop="ratingCount"]').text();
      visual.poster = $('.poster a img').attr('src');
      return resp.status(statusCode).json(visual);
    });
  });
}