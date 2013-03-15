module.exports = function(grunt) {
  grunt.initConfig({
    meta: {},
    min: {
      vendor: {
        src: [
          'contents/js/vendor/radio.js',
          'contents/js/vendor/ender.js',
          'contents/js/vendor/knockout.js',
          'contents/js/vendor/underscore-min.js',
        ],
        dest: 'build/js/vendor.min.js'
      },
      app: {
        src: [
          'contents/js/config.js',
          'contents/js/components/ui.js',
          'contents/js/components/router.js',
          'contents/js/components/api.js',
          'contents/js/pages/SearchResults.js',
          'contents/js/pages/BeerDetails.js',
          'contents/js/init.js'
        ],
        dest: 'build/js/app.min.js'
      }
    }
  });

  grunt.registerTask('default', 'min');
};
