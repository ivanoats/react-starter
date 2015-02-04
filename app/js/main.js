'use strict';

var React = require('react');

var HelloComponent = require('./components/HelloComponent');

console.log('from browserify yeah');

React.render(
  <HelloComponent />, document.getElementById('app-container')
);
