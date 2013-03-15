(function() {
  var router = require('router'),
    api = require('api'),
    ui = require('ui');

  var pages = {
    searchResults: require('SearchResults'),
    beerDetails: require('BeerDetails')
  }

  /**
    * Keep track of the state of things.
    */
  var current = {
    beer: ko.observable(),
    beers: ko.observableArray([]),
    totalBeers: ko.observable(),
    resultsPage: ko.observable(),
    totalResultsPages: ko.observable(),
    errorMessages: ko.observableArray([]),
    page: ko.observable({}),
    searchQuery: ko.observable(),
    beerTotalDelayed: ko.observable(1)
  }

  /**
    * Set up our master viewmodel.
    */
  var appVM = {
    current: current
  }

  /**
    * Declare routes for the app.
    */
  router.register('#/search/results/:searchQuery(/:resultsPageNumber)', {
    to: function() {
      searchResults = new pages.searchResults(this.params, appVM.current)
    },
    exit: function() {
      searchResults.destroy();
    }
  });

  router.register('#/beer/:id', {
    to: function() {
      beerDetails = new pages.beerDetails(this.params, appVM.current)
    },
    exit: function() {
      beerDetails.destroy();
    }
  });

  /**
    * Brew Search form handler.
    */
  appVM.searchBrews = function(form) {
    var self = this;

    self.current.errorMessages.removeAll();

    if (self.current.searchQuery()) {
      q = encodeURIComponent(self.current.searchQuery());
      return router.dispatch('#/search/results/' + q)
    }

    self.current.errorMessages.push("The beer won't find itself.")
  };

  /**
    * Make sure error messages gets cleared out on each page.
    */
  appVM.current.page.subscribe(function(newPage) {
    if (newPage) {
      appVM.current.errorMessages.removeAll();
    }
  });

  $.domReady(function() {
    router.listen();
    ko.applyBindings(appVM);
    ui.supportVW();
  });
})();
