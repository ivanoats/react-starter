module.exports = function(grunt) {

  grunt.option('stack', true);

  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    simplemocha: 'grunt-simple-mocha',
    express:     'grunt-express-server'
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app:   ['app'],
      scss:  ['<%= project.app %>/sass/style.scss'],
      css:   ['<%= project.app %>/css/**/*.css'],
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
        cwd:    'app/',
        src:    ['*.html', 'css/*.css', 'css/*.css.map', 'assets/**/*'],
        dest:   'build/',
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
        configFile: 'karma.conf.js',
        singleRun: true
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
          timeout: 10000,
          desiredCapabilities: {
            browserName: 'chrome'
          }
        }
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
          transform: ['babelify']
        }
      },
      watchify: {
        src: ['app/**/*.js'],
        dest: 'build/js/bundle.js',
        options: {
          watch: true,
          keepAlive: true,
          browserifyOptions: {
            debug: true
          },
          transform: ['6to5ify']
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

    concurrent: {
      watch: {
        tasks: ['watch', 'browserify:watchify'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      },
      copy: {
        files: ['<%= project.app %>/*.html', '<%= project.app %>/assets/**/*'],
        tasks: ['copy:dev']
      },
      express: {
        files:  [ 'server.js'],
        tasks:  [ 'express:dev:stop', 'express:dev' ],
        options: {
          spawn: false
        }
      },
      testServer: {
        files: ['test/server/**/*.js'],
        tasks: ['simplemocha']
      },
      testFrontEnd: {
        files: ['test/front-end/**/*.js'],
        tasks: ['karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'copy:dev', 'browserify:dev']);
  grunt.registerTask('test:acceptance', ['build', 'express:dev', 'webdriver']);
  grunt.registerTask('test', ['build', 'simplemocha', 'express:dev', 'webdriver', 'karma:unit']);
  grunt.registerTask('default', ['test', 'concurrent:watch']);
  grunt.registerTask('serve', ['express:dev', 'concurrent:watch']);

};
