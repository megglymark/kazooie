angular.module('app').controller('LoginCtrl',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {
    
      console.log(AuthService.getUserStatus());

      $scope.login = function () {

        $scope.error = false;
        $scope.disabled = true;

        AuthService.login($scope.loginForm.username, $scope.loginForm.password)

          .then(function () {
            $location.path('/');
            $scope.disabled = false;
            $scope.loginForm = {};
          })
        
          .catch(function () {
            $scope.error = true;
            $scope.errorMessage = "Invalid username and/or password";
            $scope.disabled = false;
            $scope.loginForm = {};
          });

      };

    }]);