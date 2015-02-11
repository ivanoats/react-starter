'use strict';

const React = require('react');

const HelloComponent = require('./components/HelloComponent');

console.log('from browserify ok');

React.render(
  <HelloComponent />, document.getElementById('app-container')
);
