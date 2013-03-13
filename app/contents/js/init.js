(function() {
  var beer = require('Beer'),
    brewery = require('Brewery')
    routes = require('routes')
    api = require('api');

  var appVM = {
    searchQuery: ko.observable()
  }

  appVM.searchBrews = function(form) {
    var q = $(form).find('#query').val();

    api.getBeers(q, function(err, res) {
      if (!err) {
        console.log(res);
      }
    });

  };

  $.domReady(function() {
    ko.applyBindings(appVM);
  });
})();