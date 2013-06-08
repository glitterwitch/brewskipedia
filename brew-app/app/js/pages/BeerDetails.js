/***** Beer Details Page View ******/
/**
  * Beer Details Page
  */

var api = require('api');

(function() {
  var BeerDetails = function(params, current) {
    this.current = current;
    this.current.page({
      name: 'beer-details',
      slug: '#/beer/'
    });
    
    this.params = params;
    this.beerId = this.params.id;

    this.init();
  };

  BeerDetails.prototype = {
    constructor: BeerDetails,

    /**
     * Setup, data fetching, and state management.
     */
    init: function () {
      var self = this;

      if (self.beerId)
        self.fetch();

      return this;
    },

    /**
     * Fetch the beer results from the server.
     */

    fetch: function() {
      var self = this;

      api.getBeer({ id: self.beerId }, function(err, res) {
        $.radio('progressIndicator').broadcast('loading:complete');

        self.current.errorMessages.removeAll();

        if (!err) {
          return(self.current.beer(res))
        }

        self.current.errorMessages.push("There was an error loading the details for this beer. Sorry!");
      });
    },

    /**
      * Called when switching routes (on exit)
      */
    destroy: function() {
      this.current.beer('');
      this.current.page({});
    }
  };

  provide('BeerDetails', BeerDetails);
})();
