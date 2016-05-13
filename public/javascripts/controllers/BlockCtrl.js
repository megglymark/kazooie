angular.module('app')
  .controller('BlockController', function(NgMap,$scope,$filter,$location,$rootScope,BlockService) {

    NgMap.getMap().then(function(map) {
      vm.map = map;
      vm.center = [39.7400,-121.8356];
    });

    $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrLT7ptOTZdVzxS8ZEvyn4wwz9k3eJd60";

    var vm = this;

    vm.onOverlayComplete = function(e) {
      var bounds = new google.maps.LatLngBounds();
      var polygon = [];
      e.overlay.setVisible(false);
      e.overlay.getPaths().getAt(0).forEach(function(item,index) {
        point = [];
        bounds.extend(item);
        angular.forEach(item.toJSON(), function(value, key) {
          this.push(value);
        }, point);
        polygon.push(point);
      });
      BlockService.postBlocks(polygon, bounds.getCenter().toJSON()).then(function(data) {
        vm.blocks.push(data.data.block);
        vm.polygons.push(data.data.block.polygon);

      });
    };

    loadBlocks = function () {
      BlockService.getBlocks().then(function(data) {
        vm.blocks = data.data;
        angular.forEach(vm.blocks, function(block) {
          this.push(block.polygon);
        }, vm.polygons = []);
      });
    };
    
    loadBlocks();

    $scope.clickedBlock = function(block,index) {
      vm.selectedBlock = block;
      vm.index = index;
      console.log(index);
    };

    $scope.clickedHarvest = function() {
      $rootScope.selectedBlock = vm.selectedBlock;
      $location.path('/scanHarvest');
    };

    vm.showBlock = function(event,polygon) {
      getSingleBlock(polygon._blockId);
    };

    getSingleBlock = function(blockId) {
      for(i = 0; i < vm.blocks.length; i++) {
        if(vm.blocks[i]._id === blockId) {
          vm.selectedBlock = vm.blocks[i];
          $rootScope.selectedBlock = vm.selectedBlock;
          $location.path('/block');
        }
      }
    };

    $scope.$watch('vm.selectedBlock', function(newValue,oldValue) {
      if(angular.toJson(oldValue,false) !== angular.toJson(newValue,false)) {
        vm.center = newValue.polygon.center;
      }
    });

    $scope.$watch('vm.index', function(newValue,oldValue) {
      if(angular.toJson(oldValue,false) !== angular.toJson(newValue,false)) {
        if(newValue !== undefined)
          vm.blocks[newValue].selected = true;
        if(oldValue !== undefined)
          vm.blocks[oldValue].selected = false;
      }
      console.log(newValue+" "+oldValue);
    });

    $scope.getSelectedBlock = function() {
      return $rootScope.selectedBlock;
    };

});
