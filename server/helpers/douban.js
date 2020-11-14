const DOUBAN_SITE = 'https://movie.douban.com/subject/';

exports.getDoubanUrl = (douban_id,opt={}) => {
  let apiName = '';
  if (opt && opt.apiName) {
    apiName = opt.apiName;
  }
  return `${DOUBAN_SITE}${douban_id}/${apiName}`;
}