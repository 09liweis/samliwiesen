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

router.route('/search').get((req,res)=>{
    const keyword = req.query.keyword;
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
    request({
        url: 'https://api.douban.com/v2/movie/subject/' + douban_id + '?apikey=0df993c66c0c636e29ecbb5344252a4a',
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

router.route('/get_imdb_id').get((req,res)=>{
    const douban_id = req.query.douban_id;
    request({
        url: 'https://movie.douban.com/subject/' + douban_id,
        method: 'GET',
        headers
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const matches = body.match(/tt[\d]{7}/g);
            let imdb_id = '';
            console.log(matches);
            if (matches && matches.length > 0) {
                imdb_id = matches[0];
            }
            const dateMatches = body.match(/[\d]{4}-[\d]{2}-[\d]{2}\([\u4e00-\u9fff]+\)/g);
            let dates = [];
            for (let i in dateMatches) {
                if (dates.indexOf(dateMatches[i]) == -1 ) {
                    dates.push(dateMatches[i]);
                }
            }
            res.send({imdb_id,release_dates:dates,status:200});
        }
    });
});

router.route('/get_imdb_rating').get((req, res) => {
    const imdb_id = req.query.imdb_id;
    request({
        url: 'https://www.imdb.com/title/' + imdb_id,   // 请求的URL
        method: 'GET',                   // 请求方法
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