const express = require('express');
const router = express.Router();

// var Xray = require('x-ray');
// var x = Xray();

var request = require('request');
var cheerio = require('cheerio');

const headers = {
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
};
const DOUBAN_SEARCH_API = 'https://movie.douban.com/j/subject_suggest?q=';
const DOUBAN_SITE = 'https://movie.douban.com/subject/';
const DOUBAN_MOVIE_API = 'https://api.douban.com/v2/movie/subject/';
const DOUBAN_API_KEY = '0df993c66c0c636e29ecbb5344252a4a';
const IMDB_SITE = 'https://www.imdb.com/title/';

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

router.route('/search').get((req,res)=>{
  const keyword = req.query.keyword;
  if (!keyword) {
    res.send({ok:0,msg:'No Keyword'});
  }
  request({
    url: DOUBAN_SEARCH_API+keyword,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body);
      res.send(results);
    }
  });
});

router.route('/celebrities').post((req,res)=>{
  const {douban_id} = req.body
  if (!douban_id) {
    return res.status(400).json({msg:'No Douban Id'});
  }
  const url = DOUBAN_SITE + douban_id + '/celebrities';
  request({
    url,
    method: 'POST',
    headers,
    json:{
      douban_id
    }
  },
  function (error, response, body) {
    var body = body.replace(/(\r\n|\n|\r)/gm, '');
    body = body.replace(/ +(?= )/g,'');
    const {statusCode} = response;
    if (error && statusCode != 200) {
      return res.status(statusCode).json({error});
    }
    const $ = cheerio.load(body.toString(),{
      normalizeWhitespace:true,
      decodeEntities:true
    });
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
      })
    }
    res.status(200).json(casts);
  });
});

router.route('/summary').get((req,res)=>{
  const {douban_id} = req.query;
  if (!douban_id) {
    res.send({ok:0,msg:'No Douban Id'});
  }
  request({
    url: DOUBAN_SITE + douban_id,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    var body = body.replace(/(\r\n|\n|\r)/gm, '');
    body = body.replace(/ +(?= )/g,'');
    const {statusCode} = response;
    if (error || (statusCode != 200)) {
      return res.status(statusCode).json({error});
    }
    const $ = cheerio.load(body.toString(),{
      normalizeWhitespace:true,
      decodeEntities:true
    });
    var episodes = 1;
    const title = $('span[property="v:itemreviewed"]').text();
    const douban_rating = $('strong[property="v:average"]').text();
    var duration = $('span[property="v:runtime"]').attr('content');
    const summary = $('span[property="v:summary"]').text().trim();

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

    const commentsMatch = $('.comment-item');
    if (commentsMatch) {
      var comments = [];
      for (var i = 0; i < commentsMatch.length; i++) {
        var comment = $(commentsMatch[i]);
        comments.push({
          text: comment.find('.short').text(),
          author: comment.find('.comment-info a').text()
        });
      }
    }

    const reviewsMatch = $('.main.review-item');
    if (reviewsMatch) {
      var reviews = [];
      for (var i = 0; i < reviewsMatch.length; i++) {
        var review = $(reviewsMatch[i]);
        reviews.push({
          title: review.find('h2 a').text(),
          content: review.find('.short-content').text()
        });
      }
    }

    const castMatches = $('.celebrity');
    if (castMatches) {
      var casts = []
      for(var i = 0; i < castMatches.length; i++) {
        var cast = $(castMatches[i]);
        casts.push(getCast(cast,$));
      }
    }

    var websiteMatch = /官方网站:<\/span><a href="(.*?)<br>/g.exec(body);
    var originalTitleMatch = /又名:<\/span>(.*?)<br\/>/g.exec(body);
    if (originalTitleMatch) {
      var originalTitle = originalTitleMatch[1].trim();
    }

    var episodesMatch = /集数:<\/span>(.*?)<br\/>/g.exec(body);
    if (episodesMatch) {
      episodes = parseInt(episodesMatch[1].trim());
      var durationMatch = /单集片长:<\/span>(.*?)<br\/>/g.exec(body);
      if (durationMatch) {
        duration = durationMatch[1].trim();
        if (/分钟/.test(duration)) {
          duration = duration.replace('分钟','');
        }
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
      casts,
      title,
      originalTitle,
      duration,
      episodes,
      languages,
      summary,
      countries,
      douban_rating,
      imdb_id,
      release_dates:dates,
      recommends,
      reviews,
      comments
    };
    if (imdb_id) {
      request({
        url: IMDB_SITE + imdb_id,
        method: 'GET',
        headers
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(body.toString());
          const imdb_rating = $('span[itemprop="ratingValue"]').text();
          const poster = $('.poster a img').attr('src');
          visual.imdb_rating = imdb_rating;
          visual.poster = poster
          return res.status(200).json(visual);
        }
      });
    } else {
      res.status(200).json(visual);
    }
  });
});

module.exports = router;