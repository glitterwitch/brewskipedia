(function () {
  var ui = {
    /**
      * Address Chrome bug with vw units
      * to make them recalculate on resize.
      */
    supportVW: function() {
      var causeRepaintsOn = $(".title a");

      function repaint() {
        causeRepaintsOn.css({ 'z-index': 1 })
      }

      $(window).off('resize.repaint');
      $(window).on('resize.repaint', _.debounce(repaint, 100));
    }
  }

  provide('ui', ui);
})();