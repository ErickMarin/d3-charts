module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: ['tmp/']
    },
    connect: {
      server: {
        options: {
          port: 8888,
          livereload: 35729,
          hostname: 'localhost',
          path: 'www-root',
          options: {
            index: 'index.html'
          },
          open: false,
          reload: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/scripts/**']
    },
    wiredep: {
      task: {
        src: ['index.html', 'src/html/*.html']
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src',
          src: '**',
          dest: 'tmp/'
        }]
      }
    },
    watch: {
      livereload: {
        options: {livereload: true, spawn: true},
        tasks: ['clean', 'jshint', 'wiredep', 'copy'],
        files: ['src/**', 'index.html'],
        reload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean', 'jshint', 'wiredep', 'copy', 'connect:server', 'watch']);
};