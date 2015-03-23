const expect = require('chai').expect;

describe('HelloComponent', function() {

  it('runs a test function', function() {
    var ok = 1;
  });

  it('passes a quite simple test', function() {
    expect(1 + 4).to.equal(5);
  });

  it('says hello in a class of hello', function() {
    const React = require('react');
    const ReactAddons = require('react/addons');
    const TestUtils = React.addons.TestUtils;
    const HelloComponent = require( '../../client/js/components/HelloComponent.js');

    var hello = TestUtils.renderIntoDocument(
      <HelloComponent message='Hello World' />
    );

    var helloFound = TestUtils.findRenderedDOMComponentWithClass(hello, 'hello');

    expect(helloFound.getDOMNode().textContent).to.equal('Hello World');
  });
});
