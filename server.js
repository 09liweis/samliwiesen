var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),

todoRoute = require('./routes/todo'),

port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/portfolio');
mongoose.connect('mongodb://heroku_6njptcbp:dg8h3o8v9dpjk1osignqn3ibel@ds125489.mlab.com:25489/heroku_6njptcbp');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/todos', todoRoute);

app.listen(port);
