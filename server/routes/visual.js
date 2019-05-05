const express = require('express');
const router = express.Router();

var Xray = require('x-ray');
var x = Xray();

var request = require('request');
var cheerio = require('cheerio');

router.route('/douban').get((req, res) => {
    const douban_id = req.query.douban_id;
    request({
        url: 'https://api.douban.com/v2/movie/subject/' + douban_id + '?apikey=0df993c66c0c636e29ecbb5344252a4a',   // 请求的URL
        method: 'GET',                   // 请求方法
        headers: {                       // 指定请求头
            'Accept-Language': 'zh-CN,zh;q=0.8', // 指定 Accept-Language
            'Accept-Charset': 'utf-8, iso-8859-1;q=0.5'
        }
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const visual = JSON.parse(body);
            res.send(visual);
        }
    });
});

module.exports = router;