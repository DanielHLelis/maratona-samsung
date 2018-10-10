var express = require('express');
var fs = require('file-system');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(morgan('common', {stream: fs.createWriteStream('./logs/access.log')}));

module.exports = app;