'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-hapi');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      app: ['app'],
      scss: ['<%= project.app %>/sass/style.scss'],
      css: ['<%= project.app %>/css/**/*.css'],
      alljs: ['<%= project.app %>/js/**/*.js']
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
        src: ['*.html', '<%= project.css %>','<%= project.app %>/css/*.css.map'],
        dest: 'build/',
        filter: 'isFile'
      }
    },

    jshint: {
      all: ['<%= project.alljs %>','Gruntfile.js','server.js'],
      options: {
        jshintrc: true
      }
    },

    jscs: {
      src: ['<%= project.alljs %>','server.js','Gruntfile.js'],
      options: {
        config: '.jscsrc'
      }
    },

    browserify: {
      dev: {
        options: {
          debug: true
        },
        src: ['<%= project.alljs %>'],
        dest: 'build/js/app.js'
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

    hapi: {
      custom_options: {
        options: {
          server: 'web',
          bases: {
            '/': '.'
          }
        }
      }
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['build']
      },
      express: {
        files:  ['server.js', 'app/index.html'],
        tasks:  ['build', 'express:dev'],
        options: {
          spawn: false
        }
      },
      app: {
        files: ['<%= project.alljs %>'],
        tasks: ['browserify:dev']
      },
      test: {
        files: ['<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: ['build:dev', 'browserify:frontEndTest', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'browserify:dev', 'copy:dev']);
  grunt.registerTask('test', ['build:dev', 'karma:continuous']);
  grunt.registerTask('default', ['test','watch']);
  grunt.registerTask('serve', [ 'build:dev', 'express:dev', 'watch' ]);

};
