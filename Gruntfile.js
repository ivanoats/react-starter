'use strict';

module.exports = function(grunt) {

  grunt.option('stack', true);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-webdriver');

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

    jshint: {
      all: ['<%= project.alljs %>', 'Gruntfile.js', 'server.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['<%= project.alljs %>', 'server.js', 'Gruntfile.js'],
      options: {
        config: '.jscsrc'
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
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

    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: false
        },
        files: {
          'build/css/style.css':'<%= project.scss %>'
        }
      }
    },

    express: {
      options: {
        // Override defaults here
        output: 'listening',
        background: true,
      },
      dev: {
        options: {
          script: 'server.js'
        }
      },
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
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['build']
      },
      copy: {
        files: ['<%= project.app %>/*.html','server.js'],
        tasks: ['build']
      },
      test: {
        files: ['<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: ['build', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('test', ['build', 'express:dev', 'webdriver', 'karma:continuous']);
  grunt.registerTask('default', ['test', 'watch']);
  grunt.registerTask('serve', ['build', 'express:dev', 'watch']);

};
