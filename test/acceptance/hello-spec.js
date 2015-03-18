var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
/*
   Chai as Promised is not compatible with PhantomJS!
   TODO polyfill for Function.prototype.bind for PhantomJS
 */
chai.use(chaiAsPromised);
var expect = chai.expect;
var port = process.env.port || 3000;

describe('home page acceptance test', function() {

  it('has title of React Starter', function(done) {
    var URL = 'http://localhost:' + port;
    var browser = this.browser;
    browser.get(URL)
      .then(function() {
      return browser.title();
    }).then(function(val){
      expect(val).to.equal('React Starter');
    }).then(done, done);
  });
});
