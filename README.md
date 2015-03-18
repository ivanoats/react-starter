# React Starter Template

This template includes:
  - A simple ExpressJS static server with Mocha Unit tests
  - ReactJS with JSX
  - Karma unit tests for React
  - Webpack with Babel Loader (enabling ES6 and beyond)
  - Acceptance (End to End) tests with gulp-mocha-selenium (wd & Selenium)

## Prerequisites

  - A working Java system (JRE or JDK) for Selenium to run acceptance tests.
  if `java -version` works from your command line, you are good.
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

## Run

`gulp`

## Contributing

Yes, please. Send me a P.R. on GitHub here.

## License

[MIT](http://opensource.org/licenses/MIT)
