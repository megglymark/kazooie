angular.module('app', [])
  .config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/', {
      templateUrl: 'views/index.html',
    })

    .when('/login', {
      templateUrl: 'views/auth/login.html',
      controller: 'LoginCtrl'
    })

    .when('/logout', {
      controller: 'LogoutCtrl'
    })

    .when('/register', {
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterCtrl'
    })

    .otherwise({redirectTo: '/'});
});
