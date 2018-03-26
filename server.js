var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),

todoRoute = require('./routes/todo'),

port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/portfolio'); 


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/todos', todoRoute);

app.listen(port);
