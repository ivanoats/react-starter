# React Starter Template

[![Build Status](https://api.shippable.com/projects/56187d45423d0e0c009c8aeb/badge?branchName=master)](https://app.shippable.com/projects/55078e185ab6cc13529dea4d/builds/latest)
[![Build Status](https://travis-ci.org/ivanoats/react-starter.svg?branch=master)](https://travis-ci.org/ivanoats/react-starter)
[![Code Climate](https://codeclimate.com/github/ivanoats/react-starter/badges/gpa.svg)](https://codeclimate.com/github/ivanoats/react-starter)
[![bitHound Score](https://www.bithound.io/github/ivanoats/react-starter/badges/score.svg)](https://www.bithound.io/github/ivanoats/react-starter)
[![Test Coverage](https://codeclimate.com/github/ivanoats/react-starter/badges/coverage.svg)](https://codeclimate.com/github/ivanoats/react-starter)
[![Dependency Status](https://david-dm.org/ivanoats/react-starter.svg)](https://david-dm.org/ivanoats/react-starter)
[![devDependency Status](https://david-dm.org/ivanoats/react-starter/dev-status.svg)](https://david-dm.org/ivanoats/react-starter#info=devDependencies)

This clone-able web site starter template includes:
  - A simple [ExpressJS](http://expressjs.com) static server with Mocha Unit tests. Build out your
  RESTful routes here.
  - [ReactJS with JSX](http://facebook.github.io/react/)
  - [Karma](http://karma-runner.github.io/0.12/index.html) unit tests for React
  - [Webpack](http://webpack.github.io) with [Babel](https://babeljs.io) Loader
   (enabling ES6 and beyond)
  - Acceptance (End to End) tests with gulp-mocha-selenium (wd & Selenium)

## Prerequisites

  - A working Java system (JRE or JDK) for Selenium to run acceptance tests.
  if `java -version` works from your command line, you are good.
  - Download and start selenium server for acceptance tests. see before_script
    section in the [.travis.yml](.travis.yml)
  - Recommended: For working on Sass / SCSS files, a working Ruby environment.
   `gem install bundler` if you haven't already.
    Accepting Pull Requests to remove this Ruby dependency.
  - ESLint installed globally: `npm -g install eslint`
  - Other recommended global packages:
  ```
  npm -g install gulp jscs mocha nodemon webpack webpack-dev-server
  ```

## Install

Clone this repo, then:

`npm install`

Optionally, for upgrading bourbon and neat, you might need a working Ruby
environment.

`bundle install` will install the Sass gems needed (Sass, Bourbon, Neat)

I am working on not requiring Ruby at all, and using node-bourbon instead.
 Please let me know if you'd like to contribute a pull request.

## Tests

`gulp test`

*Reminder*: Download and start selenium server for acceptance tests. See the
before_script section in the [.travis.yml](.travis.yml) and do this on your
local machine

## Run

`gulp`

## Contributing

Yes, please. Send me a P.R. on GitHub here.

## License

[MIT](http://opensource.org/licenses/MIT)
