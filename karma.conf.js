// Karma configuration
// Generated on Tue Sep 09 2014 13:58:24 GMT-0700 (PDT)
'use strict';

var browsers = ['Chrome', 'PhantomJS'];
if ( /^win/.test(process.platform) ) {
  browsers = ['IE'];
}
if (process.env.TRAVIS ) {
  browsers = ['PhantomJS'];
}

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify', 'mocha'],

    browserify: {
      debug:     true,
      transform: ['6to5ify']
    },

    // list of files / patterns to load in the browser
    files: [
      'node_modules/chai/chai.js',
      'test/front-end/phantomjs-bind-polyfill.js',
      'test/front-end/*-spec.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*-spec.js': ['browserify']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
