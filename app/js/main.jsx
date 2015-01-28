'use strict';

import React from 'react';

import HelloComponent from './components/HelloComponent.jsx!';

console.log('dynamically loaded');

React.render(
  <HelloComponent />, document.getElementById('app-container')
);