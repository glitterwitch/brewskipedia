(function () {
  var ui = {
    /**
      * Address Chrome bug with vw units
      */
    supportVW: function() {
      var causeRepaintsOn = $("h1");

      function repaint() {
        causeRepaintsOn.css({ 'z-index': 1 })
      }

      $(window).off('resize.repaint');
      $(window).on('resize.repaint', _.debounce(repaint, 100));
    }
  }

  provide('ui', ui);
})();