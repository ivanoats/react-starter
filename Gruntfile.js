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
        src: ['*.html', 'css/*.css', 'css/*.css.map'],
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
      development: {
        options: {
          server: require('path').resolve('./server'),
          bases: {}
        }
      }
    },

    watch: {
      sass: {
        files: '<%= project.app %>/sass/{,*/}*.{scss,sass}',
        tasks: ['build']
      },
      test: {
        files: ['<%= project.alljs %>', 'test/front-end/**/*.js'],
        tasks: ['build:dev', 'karma:unit']
      }
    }
  }); //end initConfig

  grunt.registerTask('build', ['clean:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('test', ['build:dev', 'karma:continuous']);
  grunt.registerTask('default', ['test', 'watch']);
  grunt.registerTask('serve', ['build:dev', 'hapi', 'watch']);

};
