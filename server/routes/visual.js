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

router.route('/douban').get((req, res) => {
  const douban_id = req.query.douban_id;
  if (!douban_id) {
    res.send({msg:'No Douban Id',ok:0});
  }
  request({
    url: DOUBAN_MOVIE_API + douban_id + '?apikey='+DOUBAN_API_KEY,
    method: 'GET',
    headers
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const visual = JSON.parse(body);
      const method = req.query.method;
      if (method == 'update') {
        // request.post('https://what-i-watched.herokuapp.com/api/visual/update').form(visual);
        console.log('Going to implement POST to what-i-watched');
      } else {
        res.send(visual);
      }
    }
  });
});

router.route('/get_data').get((req,res)=>{
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
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(body.toString(),{
        normalizeWhitespace:true,
        decodeEntities:true
      });
      var episodes = 1;
      const title = $('span[property="v:itemreviewed"]').text();
      const douban_rating = $('strong[property="v:average"]').text();
      const duration = $('span[property="v:runtime"]').attr('content');
      const summary = $('span[property="v:summary"]').text();

      const castMatches = $('.celebrity');
      if (castMatches) {
        var casts = []
        for(var i = 0; i < castMatches.length; i++) {
          var cast = $(castMatches[i]);
          var avt = '';
          var avtStyle = cast.find('div.avatar').attr('style');
          var avtMatches = /url\((.*?)\)/g.exec(avtStyle);
          if (avtMatches) {
            avt = avtMatches[1];
          }
          casts.push({
            name:cast.find('a.name').text(),
            avt,
            role:cast.find('.role').text()
          })
        }
      }

      var websiteMatch = /官方网站:<\/span><a href="(.*?)<br>/g.exec(body);

      var episodesMatch = /集数:<\/span>(.*?)<br\/>/g.exec(body);
      if (episodesMatch) {
        episodes = parseInt(episodesMatch[1].trim());
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
      
      res.status(200).json({casts,title,duration,episodes,languages,summary,countries,douban_rating,imdb_id,release_dates:dates});
    }
  });
});

router.route('/get_imdb_rating').get((req, res) => {
  const imdb_id = req.query.imdb_id;
  if (!imdb_id) {
    return res.send({ok:0,msg:'No IMDB ID'});
  }
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
      res.send({imdb_rating,poster});
    }
  });
});

module.exports = router;