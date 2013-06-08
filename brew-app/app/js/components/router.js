(function () {
  var pathjs = require('$').pathjs;

  /**
   * @module Routes Routes module to proxy between our app and pathjs.
   */
  var router = {
    /**
     * Register a route.
     *
     * @param {String} route hash route
     * @param {Function|Object} method the method to call when the route is requested, or a map of methods
     *
     * @example:
     * Routes.register('#/sign-up', function () {
     *   vm.registerOverlay.open();
     * });
     *
     * Routes.register('#/log-in', {
     *   to: onToLogin,
     *   exit: onExitLogin
     * });
     */
    register: function(route, methods) {
      if (pathjs.routes.defined[route]) {
        throw new Error("Route already defined: #{route}".replace(/#{route}/g, route));
      }

      if ('function' === typeof methods) {
        methods = { to: methods }
      }

      var fn = _.keys(methods),
          route = pathjs.map(route);

      _(fn).forEach(function(name) {
        route[name](methods[name]);
      });
    },

    /**
     * Manually dispatch a route
     *
     * @param {String} route Route to dispatch
     */
    dispatch: function(route) {
      return window.location = window.location.protocol + '//' + window.location.host + '/' + route;
    },

    listen: function() {
      pathjs.listen()

      if(window.location.hash.length > 0) {
        router.dispatch(window.location.hash)
      } 
    }

  }

  provide('router', router);

})();
