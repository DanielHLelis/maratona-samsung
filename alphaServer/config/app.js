var express = require('express');
var app = express();

var morgan = require('morgan');
app.use(morgan('tiny'));

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});

module.exports = app;


