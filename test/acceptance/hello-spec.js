var chai = require('chai');
var expect = chai.expect;
var port = process.env.port || 3000;
var async = require('async');

describe('acceptance test', function() {

  it('has a browser injected into it', function () {
    /* eslint-disable no-unused-expressions */
    expect(this.browser).to.be.defined;
    /* eslint-enable */
  });

  it('has title of React Starter', function(done) {
    var browser = this.browser;
    async.waterfall([
      function(cb) {
        browser.get('http://localhost:' + port, cb);
      },
      function(cb) {
        browser.title(cb);
      },
      function(val, cb) {
        console.log(val);
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
