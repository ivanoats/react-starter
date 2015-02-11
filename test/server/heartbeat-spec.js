'use strict';

var request = require('supertest');
describe('heartbeat api', function() {

  var app;
  var agent;

  before(function() {
    app = require('../../server');
    agent = request.agent(app);
  });

  after(function() {
    app.server.close();
  });

  describe('when requesting resource /heartbeat', function() {
    it('should respond with 200', function(done) {
      agent
      .get('/heartbeat')
      .expect('Content-Type', /json/)
      .expect(200)
      .end( function(err) {
          if (err) { return done(err); }
          done();
        });
    });
  });
});
