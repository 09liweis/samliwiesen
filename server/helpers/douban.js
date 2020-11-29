const DOUBAN_SITE = 'https://movie.douban.com/subject/';

exports.DOUBAN_SITE_API = 'https://movie.douban.com/j/';

exports.getDoubanUrl = (douban_id,opt={}) => {
  let apiName = '';
  if (opt && opt.apiName) {
    apiName = opt.apiName;
  }
  return `${DOUBAN_SITE}${douban_id}/${apiName}`;
}