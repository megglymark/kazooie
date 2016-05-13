angular.module('app')
  .controller('ScannerController', function($scope,$rootScope,$mdDialog,BoxService) {

    var ready = false;
    
    var block;

    $scope.getBlock = function() { 
      block = $rootScope.selectedBlock;
      console.log(block);
      return block;
    };

    //var qrPrefix;

    var previouslyScannedBoxes = [];

    var lastScanned;

    $scope.onSuccess = function(data) {
      if(ready) {
        console.log(data);
        if(lastScanned !== data) {
          lastScanned = data;
          checkIfBoxIsScanned(data);
       }
      }
    };
    $scope.onError = function(error) {
      if(ready)
        console.log(error);
    };
    $scope.onVideoError = function(error) {
        console.log(error);
    };

    $scope.mouseDown = function() {
      ready = true;
      console.log(ready);
    };
    $scope.mouseUp = function() {
      ready = false;
      console.log(ready);
    };

    $scope.showBoxDialog = function (ev) {
      $mdDialog.show({
        templateUrl: 'views/dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: true,
        scope: $scope,
        preserveScope: true,
        controller: function DialogController($scope, $mdDialog) {
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.submit = function(box) {
            $mdDialog.hide(box);
          };
        }
      })
      .then(function(box) {
        $scope.box = box;
      }, function() {
      });
    };

    checkIfBoxIsScanned = function(scannedData) {
      for(i = 0; i < previouslyScannedBoxes; i++) {
        if(previouslyScannedBoxes[i] === scannedData)
          return;
      }
      previouslyScannedBoxes.push(scannedData);
      createBoxObject(scannedData);
    };

    createBoxObject = function(scannedData) {
      /*
      if(qrPrefix !== undefined) {
        if(qrPrefix !== "") {
          scannedData.slice(prefix.length);
        }
      }
      */
      $scope.box.qrcode = scannedData;
      BoxService.postBox($scope.box)
      .then(function(data) {
        console.log(data);
      });
    };

  });
