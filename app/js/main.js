'use strict';

const React = require('react');

const HelloComponent = require('./components/HelloComponent');

console.log('from browserify');

React.render(
  <HelloComponent />, document.getElementById('app-container')
);
