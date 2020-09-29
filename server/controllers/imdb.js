const {sendRequest,getCheerio} = require('../helpers/request');

const IMDB_BOXOFFICE = 'https://www.imdb.com/chart/boxoffice';

exports.getImdbBoxOffice = (req,resp) => {
  sendRequest(IMDB_BOXOFFICE,'GET',resp,(statusCode, body) => {
    const $ = getCheerio(body);
    const chart = $('table.chart tbody tr');
    let movies = [];
    if (chart) {
      for (let i = 0; i < chart.length; i++) {
        const movie = $(chart[i]);
        const [weekend,gross] = movie.find('.ratingColumn').text().trim().split('  ');
        movies.push({
          title: movie.find('.titleColumn a').text(),
          poster: movie.find('.posterColumn img').attr('src'),
          weekend,
          gross
        });
      }
    }
    let boxOffice = {
      title: $('h1.header').text(),
      date: $('#boxoffice h4').text(),
      movies
    }
    resp.status(statusCode).json(boxOffice);
  });
}