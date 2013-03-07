module.exports = function(grunt) {
  grunt.initConfig({
    meta: {},
    uglify: {
      build: {
        src: ['contents/js/vendor/jquery.js', 'contents/js/vendor/knockout.js', 'contents/js/vendor/sammy.js' ],
        dest: 'build/js/vendor.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);
};
