var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port);
console.log('test');