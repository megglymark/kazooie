app
  .config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MapController as vm',
      access: {basic: true}
    })

    .when('/login', {
      templateUrl: 'views/auth/login.html',
      controller: 'LoginController',
      access: {basic: false}
    })

    .when('/logout', {
      controller: 'LogoutController',
      access: {basic: true},
      resolve: {
        logout: function(AuthService) {
          return AuthService.logout();
        }
      },
      redirectTo: '/login'
    })

    .when('/register', {
      templateUrl: 'views/auth/register.html',
      controller: 'RegisterController',
      access: {basic: false}
    })

    .otherwise({redirectTo: '/'});
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
  function (event, next, current) {
    AuthService.getUserStatus();
   // .then(function(data){
   //   console.log(next);
   //   console.log(data);
   //   if (next.access.basic && !data.status) {
   //     console.log("reroute - not logged in ");
   //     $location.path('/login');
   //     $route.reload();
   //   }
   // })
   // .catch(function(data) {
   //   console.log(data);
   // });
  });
});
