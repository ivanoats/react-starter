'use strict';

var reactify = require('reactify');

module.exports = function(grunt) {

  grunt.option('stack', true);

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: ['app'],
      scss: ['<%= project.app %>/sass/style.scss'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: [
        '<%= project.app %>/js/**/*.js',
        '<%= project.app %>/js/**/*.jsx'
        ]
    },

    clean: {
      dev: {
        src: ['build/']
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'app/',
        src: ['*.html', 'css/*.css', 'css/*.css.map', 'assets/**/*', 'config.js', 'js/**/*', 'jspm_packages/**/*'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      target: [
        '*.js',
        'app/js/*.js',
        'test/acceptance/*-spec.js',
        'test/front-end/*-spec.js',
        'test/server/heartbeat-spec.js'
      ]
    },

    mochacov: {
      coverage: {
        options: {
          reporter: 'mocha-term-cov-reporter',
          coverage: true
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      unit: {
        options: {
          reporter: 'spec',
          require: ['chai']
        }
      },
      html: {
        options: {
          reporter: 'html-cov',
          require: ['chai']
        }
      },
      options: {
        files: 'test/server/*-spec.js',
        ui: 'bdd',
        colors: true
      }
    },

    simplemocha: {
      all: {
        options: {

        },
        src: ['test/server/**/*-spec.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      },
      chrome: {
        configFile: 'karma.conf.js',
        browsers: ['Chrome']
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    webdriver: {
      acceptance: {
        tests: ['test/acceptance/*-spec.js'],
        options: {
          timeout: 10000000,
          desiredCapabilities: {
            browserName: 'chrome'
          }
        }
      }
    },

    watchify: {
      options: {
        debug: true,
        callback: function(b) {
          b.transform({es6: true}, reactify);
          return b;
        }
      },
      development: {
        src: './app/js/**/*.js',
        dest: 'build/js/bundle.js'
      }
    },

    browserify: {
      dev: {
        src: ['app/**/*.js'],
        dest: 'build/js/bundle.js',
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [ ['reactify', {'es6': true} ] ]
        }
      }
    },

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'build/css/style.css': '<%= project.scss %>'
        }
      }
    },

    express: {
      options: {
        // Override defaults here
        output: 'listening'
        //background: true
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
      /*eslint-disable */
      prod: {
        options: {
          script: 'server.js',
          node_env: 'production'
        }
      },
      test: {
        options: {
          script: 'server.js',
          node_env: 'test'
        }
      }
      /*eslint-enable */
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['build']
      },
      copy: {
        files: ['<%= project.app %>/*.html', 'server.js'],
        tasks: ['build']
      },
      test: {
        files: ['<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: ['build', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'copy:dev', 'browserify:dev']);
  grunt.registerTask('test:acceptance', ['build', 'express:dev', 'webdriver']);
  grunt.registerTask('test', ['build', 'simplemocha', 'express:dev', 'webdriver', 'karma:continuous']);
  grunt.registerTask('default', ['test', 'watch']);
  grunt.registerTask('serve', ['build', 'express:dev', 'watch']);

};
