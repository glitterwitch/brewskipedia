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
      name: 'search-results'
    });
    this.params = params;
    this.query = decodeURIComponent(params.searchQuery) || this.current.searchQuery();

    if (!this.current.searchQuery() && params.searchQuery) {
      this.current.searchQuery(decodeURIComponent(params.searchQuery))
    }

    this.init();
  };

  SearchResults.prototype = {
    constructor: SearchResults,

    /**
     * Setup, data fetching, and state management.
     */
    init: function () {
      var self = this;

      if (self.query)
        self.fetch();

      self.unbindEvents();
      self.bindEvents();

      return this;
    },

    /**
     * Fetch the beer results from the server.
     */

    fetch: function() {
      var self = this;

      self.current.totalBeers(null);
      self.current.beers.removeAll();

      q = self.query;

      api.getBeers(q, function(err, res) {
        self.current.errorMessages([]);

        if (!err) {
          if (res.total > 0) {
            self.current.totalBeers(res.total);
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

      // $.radio('assessmentAnalysis:loaded').subscribe(assessmentListener);
      // $.radio('question:selected').subscribe(questionListener);
    },

    unbindEvents: function() {
      // $.radio('assessmentAnalysis:loaded').unsubscribe(assessmentListener);
      // $.radio('question:selected').unsubscribe(questionListener);
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
