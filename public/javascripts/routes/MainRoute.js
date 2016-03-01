app
  .config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController'
    })

    .when('/login', {
      templateUrl: 'views/auth/login.html',
      controller: 'LoginController'
    })

    .when('/logout', {
      controller: 'LogoutController'
    })

    .when('/register', {
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterController'
    })

    .otherwise({redirectTo: '/'});
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
  function (event, next, current) {
    getUserStatus();
    if (next.access.restricted && AuthService.isLoggedIn()) {
      $location.path('/login');
      $route.reload();
    }
  });
});
