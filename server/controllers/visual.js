var request = require('request');
var cheerio = require('cheerio');

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