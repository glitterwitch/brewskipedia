/***** Search Results Page View ******/
/**
  * Search Results Page
  */

var api = require('api')
    , router = require('router')
    , listener = undefined;

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

      self.current.page().slug += self.query + '/'

      if (self.query)
        self.fetch();

      self.unbindEvents();
      self.bindEvents();

      return this;
    },

    /**
     * Fetch the beer results from the server.
     */

    fetch: function(options) {
      var self = this;

      self.current.totalBeers(null);
      self.current.beers.removeAll();

      options = {
        q: self.query,
        pageNumber: self.pageNumber
      }

      api.getBeers(options, function(err, res) {
        self.current.errorMessages([]);

        if (!err) {
          if (res.total > 0) {
            self.current.totalBeers(res.total);
            self.current.resultsPage(res.page);
            self.current.totalResultsPages(res.pages);
            return self.current.beers(res.beers);
          }
          return self.current.errorMessages.push("Sorry, no beer found. Try again.")
        }
        self.current.errorMessages.push("There was an error processing your search. Please try again.");
      });
    },

    /**
     * Set up needed DOM events
     */
    bindEvents: function() {
      var self = this;

      // Handle pagination of search results
      self.current.nextPage = ko.computed(function() {
        var currentPage = parseInt(self.current.resultsPage());

        if (currentPage < parseInt(self.current.totalResultsPages())) {
          var pageNumber = currentPage + 1;
          if (pageNumber)
            return self.current.page().slug + pageNumber;
        }
      });

      self.current.previousPage = ko.computed(function() {
        var currentPage = parseInt(self.current.resultsPage());

        if (currentPage > 1 && currentPage <= parseInt(self.current.totalResultsPages()))
          var pageNumber = currentPage - 1;
          if (pageNumber)
            return self.current.page().slug + pageNumber;
      });
    },

    unbindEvents: function() {
    },

    /**
      * Called when switching routes (on exit)
      */
    destroy: function() {
      this.unbindEvents();
      this.current.searchQuery(null);
      this.current.page({ name: null, slug: null });
    }
  };

  provide('SearchResults', SearchResults);
})();
