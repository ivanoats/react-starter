'use strict';

var expect = require('chai').expect;

describe('HelloComponent', function() {

  it('passes a very simple test', function() {
    expect(1 + 2).to.equal(3);
  });

  it('says hello in a class of hello', function() {
    var React = require('react/addons');
    var HelloComponent = require( '../../app/js/components/HelloComponent.js');
    var TestUtils = React.addons.TestUtils;

    var hello = TestUtils.renderIntoDocument(
      <HelloComponent />
    );

    //var helloFound = TestUtils.findRenderedDomComponentWithClass(hello, 'hello');

    //expect(helloFound.getDOMNode().textContent).to.equal('Hello World');
  });
});
