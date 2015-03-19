var expect = require('chai').expect;

describe('HelloComponent', function() {

  it('runs a test function', function() {
    var ok = 1;
  });

  it('passes a quite simple test', function() {
    expect(1 + 4).to.equal(5);
  });

  it('says hello in a class of hello', function() {
    var React = require('react/addons');
    var HelloComponent = require( '../../client/js/components/HelloComponent.js');
    var TestUtils = React.addons.TestUtils;

    var hello = TestUtils.renderIntoDocument(
      <HelloComponent message='Hello World' />
    );

    var helloFound = TestUtils.findRenderedDOMComponentWithClass(hello, 'hello');

    expect(helloFound.getDOMNode().textContent).to.equal('Hello World');
  });
});
