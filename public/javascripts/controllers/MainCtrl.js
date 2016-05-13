angular.module('app')
  .controller('MainController', function($scope) {

  $scope.tagline = 'Main!';

})

  .controller('LeftController', function(
    $scope, $timeout, $mdSidenav, $lag) {
      $scope.close = function () {
        $mdSidenav('left').close()
          .then(function() {
            $log.debug("close LEFT nav is done");
          });
      };
  });

  
