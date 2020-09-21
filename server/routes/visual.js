const express = require('express');
const router = express.Router();

var request = require('request');
var cheerio = require('cheerio');

const headers = {
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
};
const DOUBAN_SITE = 'https://movie.douban.com/subject/';
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

router.route('/search').post((req,res)=>{
  const {keyword} = req.body;
  if (!keyword) {
    res.status(400).json({ok:0,msg:'No Keyword'});
  }
  const url = `https://m.douban.com/search/?query=${keyword}&type=movie`;
  request({
    url,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    const {statusCode} = response;
    if (error || statusCode != 200) {
      return res.status(statusCode).json(error);
    }
    var body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g,'');
    const $ = cheerio.load(body.toString(),{
      normalizeWhitespace:true,
      decodeEntities:true
    });
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
    res.status(200).json(visuals);
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
    const {statusCode} = response;
    if (error && statusCode != 200) {
      return res.status(statusCode).json({error});
    }
    var body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g,'');
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

router.route('/summary').post((req,res)=>{
  const {douban_id} = req.body;
  if (!douban_id) {
    res.send({ok:0,msg:'No Douban Id'});
  }
  request({
    url: DOUBAN_SITE + douban_id,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    const {statusCode} = response;
    if (error || (statusCode != 200)) {
      return res.status(statusCode).json({error});
    }
    var body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g,'');
    const $ = cheerio.load(body.toString(),{
      normalizeWhitespace:true,
      decodeEntities:true
    });
    var episodes = 1;
    const title = $('span[property="v:itemreviewed"]').text();
    const douban_rating = $('strong[property="v:average"]').text();
    let duration = $('span[property="v:runtime"]').attr('content');
    const summary = $('span[property="v:summary"]').text().trim();
    const douban_vote_count = $('span[property="v:votes"]').text();

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
          author: comment.find('.comment-info a').text(),
          date: comment.find('.comment-time').text(),
          rating: comment.find('.rating').attr('class'),
          vote: comment.find('.votes').text()
        });
      }
    }

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

    const reviewsMatch = $('.main.review-item');
    if (reviewsMatch) {
      var reviews = [];
      for (var i = 0; i < reviewsMatch.length; i++) {
        var review = $(reviewsMatch[i]);
        reviews.push({
          title: review.find('h2 a').text(),
          content: review.find('.short-content').text(),
          author: review.find('.name').text(),
          rating: review.find('.main-title-rating').attr('class'),
          date: review.find('.main-meta').text()
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
      title,
      original_title,
      douban_rating,
      douban_vote_count,
      imdb_id,
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
          visual.imdb_rating = $('span[itemprop="ratingValue"]').text();
          visual.imdb_rating_count = $('span[itemprop="ratingCount"]').text();
          visual.poster = $('.poster a img').attr('src');
          return res.status(200).json(visual);
        }
      });
    } else {
      res.status(200).json(visual);
    }
  });
});

module.exports = router;