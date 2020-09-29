const {sendRequest,getCheerio} = require('../helpers/request');

const IMDB_BOXOFFICE = 'https://www.imdb.com/chart/boxoffice';

exports.getImdbBoxOffice = (req,resp) => {
  sendRequest(IMDB_BOXOFFICE,'GET',resp,(statusCode, body) => {
    const $ = getCheerio(body);
    let boxOffice = {
      title: $('h1.header').text()
    }
    resp.status(statusCode).json(boxOffice);
  });
}