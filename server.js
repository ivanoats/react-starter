'use strict';

var path        = require('path');
var express     = require('express');
var compression = require('compression');
var redirect    = require('express-redirect');
var app         = express();

// GZip compression
app.use(compression());

// Mount redirect plugin
redirect(app);

// is it ALIVE?!
app.get('/heartbeat', function(req, res) {
  res.status(200).json('OK');
});

// to ease testing
app.redirect('/', '/build');

// static route
app.use(express.static(path.join(__dirname)));

var port = process.env.PORT || 3000;

app.server = app.listen(port, function() {
  console.log('Express app listening at port %s', app.server.address().port );
});

// Export app in module for testing
module.exports = app;
