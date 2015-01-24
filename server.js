<<<<<<< HEAD
'use strict';

var createServer = require('./createServer');

module.exports = createServer();
=======
var Hapi = require('hapi');
var server = new Hapi.Server();
var port = process.env.PORT || 3000;

server.connection({
  host: 'localhost',
  port: port
});

// static route
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'build'
    }
  }
});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
>>>>>>> f81467a9e04c90c9dfd4b35ab083f514a5674e4a
