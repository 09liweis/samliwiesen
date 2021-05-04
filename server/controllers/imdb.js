const {sendRequest,sendResp,sendErr} = require('../helpers/request');

const IMDB_BOXOFFICE = 'https://www.imdb.com/chart/boxoffice';

exports.getImdbBoxOffice = (req,resp) => {
  sendRequest({url:IMDB_BOXOFFICE},(err,{statusCode, $}) => {
    if (err) {
      return sendErr(resp,err);
    }
    const chart = $('table.chart tbody tr');
    if (chart) {
      var movies = chart.toArray().map((c)=>{
        const movie = $(c);
        const [weekend,gross] = movie.find('.ratingColumn').text().trim().split('  ');
        var imdbUrl = movie.find('.posterColumn a').attr('href').split('?')[0];
        if (imdbUrl) {
          var imdb_id = imdbUrl.split('/')[2];
        }
        return {
          imdb_id,
          title: movie.find('.titleColumn a').text(),
          poster: movie.find('.posterColumn img').attr('src'),
          weekend,
          gross,
          weeks: movie.find('.weeksColumn').text()
        };
      });
    }
    let boxOffice = {
      title: $('h1.header').text(),
      date: $('#boxoffice h4').text(),
      movies
    }
    sendResp(resp,boxOffice);
  });
}