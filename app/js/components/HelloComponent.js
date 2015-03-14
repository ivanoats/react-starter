import React from 'react';

const HelloComponent = React.createClass({
  render: function() {
    return (
      <h1 className="hello">Hello World</h1>
    );
  }
});

export { HelloComponent };
