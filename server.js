var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),

todoRoute = require('./routes/todo'),

port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

if (app.settings.env == 'development') {
    mongoose.connect('mongodb://localhost/portfolio');
} else {
    mongoose.connect('mongodb://heroku_6njptcbp:dg8h3o8v9dpjk1osignqn3ibel@ds125489.mlab.com:25489/heroku_6njptcbp');
}

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    if (app.settings.env == 'development') {
        res.setHeader('Access-Control-Allow-Origin', 'https://porfolio-a09liweis.c9users.io');
    } else {
        res.setHeader('Access-Control-Allow-Origin', 'https://samliweisen.github.io');
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/todos', todoRoute);

app.listen(port);
