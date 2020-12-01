const DOUBAN_SITE = 'https://movie.douban.com/subject/';

exports.DOUBAN_SITE_API = 'https://movie.douban.com/j/';

exports.getDoubanUrl = (douban_id,opt={}) => {
  let apiName = '';
  if (opt && opt.apiName) {
    apiName = opt.apiName;
  }
  return `${DOUBAN_SITE}${douban_id}/${apiName}`;
}

exports.getVisualReviews = ($) => {
  const reviewsMatch = $('.main.review-item');
  var reviews = [];
  if (reviewsMatch) {
    for (var i = 0; i < reviewsMatch.length; i++) {
      var review = $(reviewsMatch[i]);
      var rating = review.find('.main-title-rating').attr('class');
      if (typeof rating == 'string') {
        try {
          rating = rating.replace('main-title-rating','').replace('allstar','').trim();
          rating = parseFloat(rating) / 10;
        } catch (error) {
          console.error(error);
        }
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

exports.getVisualComments = ($) => {
  const commentsMatch = $('.comment-item');
  var comments = [];
  if (commentsMatch) {
    for (var i = 0; i < commentsMatch.length; i++) {
      var comment = $(commentsMatch[i]);
      var rating = comment.find('.rating').attr('class');
      if (typeof rating == 'string') {
        try {
          rating = rating.replace('rating','').replace('allstar','').trim();
          rating = parseFloat(rating) / 10;
        } catch (e) {
          console.error(e)
        }
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