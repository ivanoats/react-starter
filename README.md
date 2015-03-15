# React Starter Template

This template includes:
  - A simple ExpressJS static server with Mocha Unit tests
  - ReactJS with JSX
  - Karma unit tests for React
  - Browserify with Reactify (ES6) transform enabled
  - Acceptance (End to End) tests with WebdriverIO (Selenium)

## Prerequisites

  - A working Java system (JRE or JDK) for Selenium to run acceptance tests.
  if `java -version` works from your command line, you are good.
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

## Run

`gulp`

## Contributing

Yes, please. Send me a P.R. on GitHub here.

## License

[MIT](http://opensource.org/licenses/MIT)
