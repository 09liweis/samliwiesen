var request = require('request');
var cheerio = require('cheerio');

const DOUBAN_SITE = 'https://movie.douban.com/subject/';
const IMDB_SITE = 'https://www.imdb.com/title/';

const headers = {
  'Accept-Language': 'zh-CN,zh;q=0.8',
  'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
};

function getCheerio(body) {
  var body = body.replace(/(\r\n|\n|\r)/gm, '').replace(/ +(?= )/g,'');
  const $ = cheerio.load(body.toString(),{
    normalizeWhitespace:true,
    decodeEntities:true
  });
  return $;
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

exports.search = (req, res) => {
  const {keyword} = req.body;
  if (!keyword) {
    res.status(400).json({ok:0,msg:'No Keyword'});
  }
  const url = `https://m.douban.com/search/?query=${encodeURIComponent(keyword)}&type=movie`;
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
    const $ = getCheerio(body);
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
}

exports.getCelebrities = (req,res)=>{
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
    const $ = getCheerio(body);
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
}