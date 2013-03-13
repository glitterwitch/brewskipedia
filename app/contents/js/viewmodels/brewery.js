(function() {
  var Brewery = {
    id: ko.observable(),
    name: ko.observable(),
    url: ko.observable(),
    created_at: ko.observable(),
    updated_at: ko.observable()
  };

  provide('Brewery', Brewery);
})();