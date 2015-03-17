var chai = require('chai');
var expect = chai.expect;
var port = process.env.port || 3000;
var async = require('async');

describe('acceptance test', function() {

  it('has a browser injected into it', function () {
    expect(this.browser).to.be.defined;
  });

  it('has title of React Starter', function(done) {
    var browser = this.browser;
    async.waterfall([
      function(cb) {
        browser.get('http://localhost:' + port);
      },
      function(cb) {
        console.log(browser.title());
        cb(browser.title());
      },
      function(val, cb) {
        try {
          expect(val).to.equal('React Starter');
          cb();
        } catch(e) {
          cb(e);
        }
      }
    ], done);

  });
});
