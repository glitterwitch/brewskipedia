(function() {
  var beer = require('Beer'),
    brewery = require('Brewery');

  var appVM = function() {

  }

  $.domReady(function() {
    ko.applyBindings(appVM);
  });
})();