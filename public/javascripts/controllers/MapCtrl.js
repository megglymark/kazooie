angular.module('app')
  .controller('MapController', function(NgMap,$scope,ShapeService) {

    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
    });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrLT7ptOTZdVzxS8ZEvyn4wwz9k3eJd60";

    var vm = this;

    vm.onOverlayComplete = function(e) {
      var polygon = [];
      e.overlay.getPaths().getAt(0).forEach(function(item,index) {
        console.log(item.toJSON());
        polygon.push(item);
      });
      ShapeService.postPolygons(angular.toJson(polygon));
    };

});
