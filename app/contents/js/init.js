(function() {
  var beer = require('Beer'),
    brewery = require('Brewery')
    routes = require('routes');

  var appVM = function() {

  }

  $.domReady(function() {
    ko.applyBindings(appVM);
  });
})();