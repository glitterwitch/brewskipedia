(function() {
  var beer = require('Beer'),
    brewery = require('Brewery')
    routes = require('routes')
    api = require('api');

  var appVM = {
    searchQuery: ko.observable(),
    page: ko.observable({}),
    currentBeers: ko.observableArray([]),
    errorMessages: ko.observableArray()
  }

  // Brew Search form handler.
  appVM.searchBrews = function(form) {
    var self = this;

    var q = $(form).find('#query').val();

    api.getBeers(q, function(err, res) {
      if (!err) {
        if (res.total > 0) {
          self.errorMessages([]);
          return self.currentBeers(res.beers);
        }
        return self.errorMessages.push("Sorry, no beer found. Try again.")
      }
      self.errorMessages.push("There was an error processing your search. Please try again.");
    });
  };

  $.domReady(function() {
    ko.applyBindings(appVM);
  });
})();
