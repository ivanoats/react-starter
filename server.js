'use strict';

var express = require('express');
var compression = require('compression');

var app = express();

// GZip compression
app.use(compression());

// is it ALIVE?!
app.get('/heartbeat', function(req,res) {
  res.status(200).json('OK');
});

// static route
app.use(express.static(__dirname + '/build'));

var server = app.listen(process.env.PORT || 3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Express app listening at http://%s:%s', host, port);
});

// Export app in module for testing
module.exports = app;