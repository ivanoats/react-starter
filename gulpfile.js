// Gulpfile
var fs            = require('fs');
var path          = require('path');
var gulp          = require('gulp');
var gutil         = require('gulp-util');
var karma         = require('karma').server;
var eslint        = require('gulp-eslint');
var mocha         = require('gulp-mocha');
var mochaSelenium = require('gulp-mocha-selenium');
var nodemon       = require('gulp-nodemon');
var connect       = require('gulp-connect');
var shell         = require('gulp-shell');
var sass          = require('gulp-sass');
var webpack       = require('webpack');
var del           = require('del');
var vinylPaths    = require('vinyl-paths');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;

// Webpack configs
var buildCfg    = require('./webpack.config');
var buildDevCfg = require('./webpack.dev-config');

var src  = './client/';
var dest = './build/';

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
var FRONTEND_FILES = [
  src + 'js/**/*.{js,jsx}'
];

var HTML_FILES = [
  src + 'index.html',
  src + 'style-guide.html'
];

var ASSETS = [
  src + 'assets/**/*'
];

var STYLE_CSS = [
  src + 'css/**/*.css'
];

var BACKEND_FILES = [
  'test/server/**/*.js',
  '*.js'
];

// ----------------------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------------------
// Strip comments from JsHint JSON files (naive).
var _jsonCfg = function(name) {
  var raw = fs.readFileSync(name).toString();
  return JSON.parse(raw.replace(/\/\/.*\n/g, ''));
};

var logReload = function(msg) {
  console.log('[BS] reloading:', msg);
  reload({stream: true});
};

// ----------------------------------------------------------------------------
// EsLint
// ----------------------------------------------------------------------------
gulp.task('eslint-frontend', function() {
  return gulp
    .src(FRONTEND_FILES)
    .pipe(eslint({
      configFile: './.eslintrc',
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.formatEach('stylish', process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task('eslint-backend', function() {
  return gulp
    .src(BACKEND_FILES)
    .pipe(eslint({
      configFile: './.eslintrc',
      envs: [
        'node'
      ]
    }))
    .pipe(eslint.formatEach('stylish', process.stderr))
    .pipe(eslint.failOnError());
});

gulp.task('eslint', ['eslint-frontend', 'eslint-backend']);

// ----------------------------------------------------------------------------
// Check Code Quality
// ----------------------------------------------------------------------------

gulp.task('check', ['eslint']);
gulp.task('check:ci', ['eslint']);
gulp.task('check:all', ['eslint']);

// ----------------------------------------------------------------------------
// Cleaning
// ----------------------------------------------------------------------------
gulp.task('clean', function() {
  return gulp
    .src(dest, { read: false })
    .pipe(vinylPaths(del));
});

// ----------------------------------------------------------------------------
// Copying, Building and Watching
// ----------------------------------------------------------------------------

// copy static html files
gulp.task('copy:html', function() {
  gulp.src(HTML_FILES)
    .pipe(gulp.dest(dest));
});

// copy (mostly imported UW) assets
gulp.task('copy:assets', function() {
  gulp.src(ASSETS)
    .pipe(gulp.dest(path.join(dest, 'assets')));
});

// copy plain css
gulp.task('copy:css', function() {
  gulp.src(STYLE_CSS)
    .pipe(gulp.dest(path.join(dest, 'css')));
});

// roll-up copy task
gulp.task('copy', ['copy:assets', 'copy:css', 'copy:html']);

// compile Sass
gulp.task('sass', function() {
  gulp.src(path.join(src, 'sass', '*.scss'))
    .pipe(sass(
      {
        sourcemap: true,
        includePaths: require('node-bourbon').includePaths
      }
    ))
    .pipe(gulp.dest(path.join(dest, 'css')))
    .pipe(reload({stream: true}));
});

// webpack the javascript
gulp.task('webpack', function(done) {
/* eslint-disable */
  webpack(buildDevCfg).run(function(err, stats) {
    if (err) { throw new gutil.PluginError('webpack', err); }

    gutil.log('[webpack]', 'bundling');

    /* useful for debugging webpack
    gutil.log('[webpack]', stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));
    */

    done();
  });
});
/* eslint-enable */

// copy static and then build js
gulp.task('build:dev', ['copy', 'sass', 'webpack']);

gulp.task('watch', function() {
  gulp.watch([
    path.join(src, 'js', '**', '*.{js,jsx}'),
    path.join(src, 'index.html')
  ], ['webpack']).on('change', logReload);

  gulp.watch([
    path.join(src, 'sass', '**', '*.scss')
  ], ['sass']).on('change', logReload);
});

gulp.task('browser-sync', function() {
  browserSync({
    ui: {
      port: 3003
    },
    files: [path.join(dest, '**', '*')],
    port: 3002,
    proxy: 'http://localhost:3000',
    open: false
  });
});

// ----------------------------------------------------------------------------
// Production
// ----------------------------------------------------------------------------
gulp.task('build:prod', function(done) {
  webpack(buildCfg).run(function(err, stats) {
    if (err) { throw new gutil.PluginError('webpack', err); }

    gutil.log('[webpack]', stats.toString({
      hash: true,
      colors: true,
      cached: false
    }));

    done();
  });
});

gulp.task('build:prod-full', ['clean'], function() {
  return gulp.run('build:prod');
});

gulp.task('watch:prod', function() {
  gulp.watch([
    path.join('build', '**', '*.{js,jsx}')
  ], ['build:prod']);
});

// ----------------------------------------------------------------------------
// Servers
// ----------------------------------------------------------------------------
// Dev. server
var called = false;
gulp.task('server', function(cb) {
  return nodemon({
    script: 'server.js',
    ext: 'js,jsx',
    watch: [
      'server',
      path.join(src, 'index.html')
    ]
  })
  .on('start', function onStart() {
    if (!called) { cb(); }

    called = true;
  })
  .on('restart', function onRestart() {
    //delay the browser reload
    setTimeout(function reload() {
      browserSync.reload({stream: false});
    }, 500);
  });
});

// Hot reload webpack server
gulp.task('webpack-server', shell.task(['node ./hot/server']));

// Source maps server
gulp.task('server:sources', function() {
  connect.server({
    root: __dirname,
    port: 3001
  });
});

// ----------------------------------------------------------------------------
// Tests
// ----------------------------------------------------------------------------

gulp.task('test:karma', function(done) {
  karma.start({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true
  }, done);
});

gulp.task('test:server', function(done) {
  // set port != 3000 in order to not conflict with karma and selenium
  process.env.PORT = 3010;
  return gulp.src(path.join('test', 'server', '**', '*-spec.js'), {read: false})
    .pipe(mocha({reporter: 'dot'}), done);
});

gulp.task('test:acceptance', function(done) {
  return gulp.src('test/acceptance/*-spec.js', {read: false})
    .pipe(mochaSelenium({
      browserName: 'firefox',

      // make sure to launch Selenium server in another terminal window first
      // `brew install selenium-server`
      // `npm -g install selenium-server`
      // `selenium-server start`
      // or get the jar file:
      // `wget http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar`
      // `java -jar selenium-server-standalone-2.45.0.jar > /dev/null &`
      host: 'localhost',
      port: '4444',

      // Config for using Sauce Labs
      // host: 'ondemand.saucelabs.com',
      // port: '80',
      // username: process.env.SAUCE_USERNAME,
      // accesskey: process.env.SAUCE_ACCESS_KEY,
      // useSystemPhantom: true,
      bail: true,
      reporter: 'dot',
      usePromises: true,
      timeout: 15000
    })
      .once('end', function() {
        /* eslint-disable no-process-exit */
        process.exit();

        /* eslint-enable no-process-exit */
      }

    ), done);

});

// ----------------------------------------------------------------------------
// Aggregations
// ----------------------------------------------------------------------------
gulp.task('serve', ['server']);
gulp.task('test', ['test:server', 'test:karma', 'test:acceptance']);
gulp.task('ls', ['build:ls', 'watch:ls', 'server:sources']);
gulp.task('dev', ['build:dev', 'watch', 'server', 'server:sources', 'browser-sync']);
gulp.task('hot', ['webpack-server']);
gulp.task('prod', ['build:prod', 'watch:prod', 'server', 'server:sources']);
gulp.task('build', ['build:prod-full']);
gulp.task('default', ['check', 'dev']);
