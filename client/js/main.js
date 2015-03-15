'use strict';

import React from 'react';

const HelloComponent = require('./components/HelloComponent');

console.log('from browserify');

React.render(
  <HelloComponent />, document.getElementById('app-container')
);
