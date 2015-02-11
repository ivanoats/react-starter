/* global browser */
'use strict';

var chai = require('chai');
var expect = chai.expect;
var port = process.env.port || 3000;

describe('acceptance test', function() {

  it('has title of React Starter', function(done) {
    browser
      .url('http://localhost:' + port)
      .getTitle(function(err, title) {
        if (err) {
          throw err;
        }
        expect(title).to.equal('React Starter');
      })
      .call(done);
  });
});
