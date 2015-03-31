import React from 'react/addons';
import { HelloComponent } from '../../client/js/components/HelloComponent';
import { expect } from 'chai';

describe('HelloComponent', function() {

  /*
  beforeEach(function () {

  });
  */

  it('runs a test function', function() {
    var ok = 'test is ok';
    console.log(ok); //keep console.log here to use variable
  });

  it('passes a quite simple test', function() {
    expect(1 + 4).to.equal(5);
  });

  it('says hello in a class of hello', function() {
    var TestUtils = React.addons.TestUtils;
    var hello = TestUtils.renderIntoDocument(
      <HelloComponent message='Hello World' />
    );

    var helloFound = TestUtils.findRenderedDOMComponentWithClass(hello, 'hello');

    expect(React.findDOMNode(helloFound).textContent).to.equal('Hello World');
  });
});
