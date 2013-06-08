exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  plugins:
    static_jade:
      extension: ".static.jade"

  modules:
    wrapper: false
    definition: false

  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        before: [
          'vendor/js/ender.js',
          'vendor/js/radio.js',
          'vendor/js/knockout.js',
          'vendor/js/knockout.mapping.js',
          'vendor/js/underscore-min.js',
          'app/js/config.js',
          'app/js/components/ui.js',
          'app/js/components/router.js',
          'app/js/components/api.js',
          'app/js/pages/SearchResults.js',
          'app/js/pages/BeerDetails.js',
          'app/js/init.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: []
        after: []

    # Ensure that our jade templates don't get compiled into our app JS.
    templates:
      joinTo: 'javascripts/template.js'
