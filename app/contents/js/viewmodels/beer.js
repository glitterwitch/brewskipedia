(function() {
  var Beer = {
    id: ko.observable(),
    name: ko.observable(),
    description: ko.observable(),
    abv: ko.observable(),
    created_at: ko.observable(),
    updated_at: ko.observable(),
    brewery: ko.observable()
  }

  provide('Beer', Beer);
})();