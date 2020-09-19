const express = require('express');
const router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
const stores = {
  foodbasics:'https://ecirculaire.foodbasics.ca/flyers/foodbasics-flyer/grid_view/532070?type=2',
  costco:'https://www.costco.ca/coupons.html',
  nofills:'https://www.nofrills.ca/api/product/flyer?pageSize=48&sort=price-asc',
  walmart:'https://flyers.walmart.ca/flyer_data/3364166?locale=en'
}

router.route('/').get((req,res)=>{
  const store = req.query.store;
  const url = stores[store];
  console.log(url);
  request({
    url:url,
    method:'GET'
  },(err,resp,body)=>{
    console.log(body);
    let rets = [];
    switch (store) {
      case 'foodbasics':
        rets = parseFbs(body)
        break;
      case 'nofills':
        console.log(body);
      default:
        break;
    }
    res.json(rets);
  });
});

function parseFbs(body) {
  const $ = cheerio.load(body.toString());
  var newslist = [];
  $('.category-allcategories .item').each(function() {
    const price = $(this).find('.item-price').attr('aria-label');
    const name = $(this).find('.item-name').text();
    const img = $(this).find('.img-wrapper img').attr('src');
    // const link = $(this).find('.title a').attr('href');
    // const image = $(this).find('.ig img').attr('src');
    // const summary = $(this).find('dd .newslist-summary p').text();
    // const date = $(this).find('.times').text();
    newslist.push({price,name,img});
  });
  return newslist;
}

module.exports = router;