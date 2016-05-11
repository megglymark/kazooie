angular.module('app')
  .controller('MapController', function(NgMap,$scope,ShapeService) {


    NgMap.getMap().then(function(map) {
      vm.map = map;
      console.log(vm.blocks);
      console.log(vm.polygons);
    });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrLT7ptOTZdVzxS8ZEvyn4wwz9k3eJd60";

    var vm = this;

    vm.onOverlayComplete = function(e) {
      var polygon = [];
      e.overlay.getPaths().getAt(0).forEach(function(item,index) {
        point = [];
        angular.forEach(item.toJSON(), function(value, key) {
          this.push(value);
        }, point);
        polygon.push(point);
      });
      ShapeService.postPolygons(polygon);
    };

    loadBlocks = function () {
      ShapeService.getPolygons().then(function(data) {
        vm.blocks = data.data;
        angular.forEach(vm.blocks, function(block) {
          this.push(block.polygon);
        }, vm.polygons = []);
      });
    };
    
    loadBlocks();

});
