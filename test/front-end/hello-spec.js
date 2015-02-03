'use strict';

var expect = require('chai').expect;

describe('HelloComponent', function() {
  it('says hello in a css class of hello', function() {
    import React from 'react/addons';
    import HelloComponent from '../../app/js/components/HelloComponent.jsx!';
    var TestUtils = React.addons.TestUtils;

    var hello = TestUtils.renderIntoDocument(
      <HelloComponent />
    );

    var hello_found = TestUtils.findRenderedDomComponentWithClass(hello, 'hello');

    expect(hello_found.getDOMNode().textContent).to.equal('Hello World');
  });
});