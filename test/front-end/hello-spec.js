import { HelloComponent } from '../../client/js/components/HelloComponent';
import React from 'react/addons';
import { expect } from 'chai';

describe('HelloComponent', function() {

  /*
  beforeEach(function () {

  });
  */

  it('runs a test function', function() {
    var ok = 1;
  });

  it('passes a quite simple test', function() {
    expect(1 + 4).to.equal(5);
  });

  it('says hello in a class of hello', function() {
    const TestUtils = React.addons.TestUtils;
    const hello = TestUtils.renderIntoDocument(
      <HelloComponent message='Hello World' />
    );

    const helloFound = TestUtils.findRenderedDOMComponentWithClass(hello, 'hello');

    expect(React.findDOMNode(helloFound).textContent).to.equal('Hello World');
  });
});
