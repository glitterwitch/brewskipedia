(function () {
  var CONFIG = require('config');

  var api = {
    getBeers: function(options, callback) {
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
    }
  }

  provide('api', api);
})();