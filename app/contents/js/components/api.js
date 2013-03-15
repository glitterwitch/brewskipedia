(function () {
  var CONFIG = require('config');

  var api = {
    /**
      * Query the database for beer.
      */
    getBeers: function(options, callback) {
      radio('progressIndicator').broadcast('loading:data');
      $.ajax({
        url: CONFIG.serverURL + 'beers.json'
        , method: 'GET'
        , data: { 
          query: options.q
          , page: options.pageNumber || 1
          , token: CONFIG.publicToken 
          , per_page: 5
        }
        , error: function(err) {
          return callback(err, null);
        }
        , success: function(res) {
          return callback(null, res);
        }
      });
    },

    /**
      * Load a specific beer from the server by id.
      */
    getBeer: function(options, callback) {
      radio('progressIndicator').broadcast('loading:data');
      $.ajax({
        url: CONFIG.serverURL + 'beers/' + options.id + '.json'
        , method: 'GET'
        , error: function(err) {
          return callback(err, null);
        } 
        , success: function(res) {
          return callback(null, res);
        }
      });
    }
  }

  provide('api', api);
})();