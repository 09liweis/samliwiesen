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

router.route('/get_imdb_id').get((req,res)=>{
	const douban_id = req.query.douban_id;
	if (!douban_id) {
		res.send({ok:0,msg:'No Douban Id'});
	}
	request({
		url: DOUBAN_SITE + douban_id,
		method: 'GET',
		headers
	},
	function (error, response, body) {
		if (!error && response.statusCode == 200) {
			const matches = body.match(/tt[\d]{7,8}/g);
			let imdb_id = '';
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
    if (!imdb_id) {
        res.send({ok:0,msg:'No IMDB ID'});
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