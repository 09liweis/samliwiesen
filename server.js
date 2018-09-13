'use strict';
var express = require('express'),
path = require('path'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),

indexRoute = require('./server/routes/index'),
todoRoute = require('./server/routes/todo'),
transactionRoute = require('./server/routes/transaction'),
experienceRoute = require('./server/routes/experience'),
projectRoute = require('./server/routes/project'),
placeRoute = require('./server/routes/place'),
blogRoute = require('./server/routes/blog'),
SiteRoute = require('./server/routes/site'),

port = process.env.PORT || 8081;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://heroku_6njptcbp:dg8h3o8v9dpjk1osignqn3ibel@ds125489.mlab.com:25489/heroku_6njptcbp');

mongoose.connection.on('connected', function() {
    console.log('Connected to db');
});

mongoose.connection.on('error', function() {
    console.log('connected fail');
});

mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

app.use(function (req, res, next) {
    const origins = ['https://porfolio-a09liweis.c9users.io', 'https://samliweisen.github.io', 'https://samliweisen-a09liweis.c9users.io'];
    // Website you wish to allow to connect
    if (origins.indexOf(req.headers.origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);   
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

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', indexRoute);
app.use('/api/todos', todoRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/experiences', experienceRoute);
app.use('/api/projects', projectRoute);
app.use('/api/places', placeRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/sites', SiteRoute);

app.listen(port, () => {
    console.log('Web server runs on: ' + port);
});