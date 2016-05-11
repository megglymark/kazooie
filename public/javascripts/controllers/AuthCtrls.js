angular.module('app')
  .controller('LoginController',
  ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {
    
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

angular.module('app')
  .controller('LogoutController',
    ['$scope', '$location', 'AuthService',
    function ($scope, $location, AuthService) {

      logout = function () {

        AuthService.logout()

          .then(function () {
            $location.path('/login');
          })
          .catch(function () {
            console.log("Couldn't logout");
          });

      };

      //fire logout on controller load
      logout();

}]);

angular.module('app')
  .controller('RegisterController',
    ['$scope', '$location', 'AuthService',
      function ($scope, $location, AuthService) {

        $scope.register = function () {

          $scope.error = false;
          $scope.disabled = true;
          console.log($scope.registerForm);

          AuthService.register($scope.registerForm)
            .then(function () {
              $location.path('/login');
              $scope.disabled = false;
              $scope.registerForm = {};
            })
            .then(function () {
              $scope.error = true;
              $scope.errorMessage = "Something went wrong!";
              $scope.disabled = false;
              $scope.registerForm = {};
            })
        };
}]);
