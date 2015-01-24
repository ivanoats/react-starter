// jscs:disable requireMultipleVarDecl
'use strict';

var Hapi = require('hapi');
var _    = require('lodash');

var createServer = function(host, port, options) {
  var server = new Hapi.Server(options);

  server.connection({
    host: host || 'localhost',
    port: port || 3000
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'build',
        listing: true
      }
    }
  });

  server.start(function() {
    console.log('Server running at:', server.info.uri);
  });

  return server;
};

module.exports = function(host, port, options) {
  return createServer(host, port, options);
};
