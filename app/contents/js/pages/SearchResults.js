/***** Search Results Page View ******/
/**
  * Search Results Page
  */

var api = require('api'),
  loadingListener = undefined;

(function() {
  var SearchResults = function(params, current) {
    this.current = current;
    this.current.page({
      name: 'search-results',
      slug: '#/search/results/'
    });

    this.params = params;
    this.query = decodeURIComponent(params.searchQuery) || this.current.searchQuery();
    this.pageNumber = params.resultsPageNumber;
    this.current.beerTotalDelayed = ko.observable();

    this.init();
  };

  SearchResults.prototype = {
    constructor: SearchResults,

    /**
     * Setup, data fetching, and state management.
     */
    init: function () {
      var self = this;

      // Set search query observable if only parameter is set (e.g. on reload)
      if (!self.current.searchQuery() && self.params.searchQuery) {
        self.current.searchQuery(decodeURIComponent(self.query))
      }

      if (self.query)
        self.fetch();

      self.pagination();

      // Throttled computed observable for error state so it doesn't flash when changing pages.
      self.current.beerTotalDelayed = ko.computed(function() {
        return self.current.totalBeers()
      }, 500);

      return this;
    },

    /**
     * Fetch the beer results from the server.
     */

    fetch: function() {
      var self = this;

      // self.current.totalBeers('');
      self.current.beers.removeAll();

      options = {
        q: self.query,
        pageNumber: self.pageNumber
      }

      api.getBeers(options, function(err, res) {
        radio('loadingListener').broadcast('loading:complete');
        self.current.errorMessages.removeAll();
        if (!err) {
          if (res.total > 0) {
            self.current.totalBeers(res.total);
            self.current.resultsPage(res.page);
            self.current.totalResultsPages(res.pages);
            return self.current.beers(res.beers);
          }
          self.current.totalBeers(0);
          self.current.resultsPage('');
          self.current.totalResultsPages('');
          return self.current.errorMessages.push("Sorry, no beer found.")
        }
        self.current.totalBeers(0);
        self.current.resultsPage('');
        self.current.totalResultsPages('');
        return self.current.errorMessages.push("Sorry, there was an error processing your search.");
      });
    },

    /**
     * Computed Observables
     */
    pagination: function() {
      var self = this;

      // Handle pagination of search results
      self.current.nextPage = ko.computed(function() {
        var currentPage = parseInt(self.current.resultsPage());

        if (currentPage < parseInt(self.current.totalResultsPages())) {
          var pageNumber = currentPage + 1;
          if (pageNumber)
            return self.current.page().slug + encodeURIComponent(self.query) + "/" + pageNumber;
        }
      });

      self.current.previousPage = ko.computed(function() {
        var currentPage = parseInt(self.current.resultsPage());

        if (currentPage > 1 && currentPage <= parseInt(self.current.totalResultsPages()))
          var pageNumber = currentPage - 1;
          if (pageNumber)
            return self.current.page().slug + encodeURIComponent(self.query) + "/" + pageNumber;
      });
    },

    /**
      * Called when switching routes (on exit)
      */
    destroy: function() {
      this.current.page({});
      this.current.searchQuery('');
    }
  };

  provide('SearchResults', SearchResults);
})();
