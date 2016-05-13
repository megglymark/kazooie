app
  .config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) {

  $routeProvider
    
    .when('/', {
      templateUrl: 'views/map.html',
      controller: 'BlockController as vm',
      access: {basic: false}
    })
    
    .when('/redraw', { 
      templateUrl: 'views/redraw.html',
      controller: 'BlockController as vm',
      access: {baic: false},
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

    .when('/block', {
      templateUrl: 'views/block.html',
      controller: 'BlockController as vm',
      access: {basic: false}
    })
    .when('/scanner', {
      templateUrl: 'views/scanner.html',
      controller: 'ScannerController',
      access: {basic: false}
    })
    .when('/box', {
      templateUrl: 'views/box.html',
      controller: 'BoxController',
      access: {basic: false}
    })
    .when('/qrcodes', {
      templateUrl: 'views/qrcodes.html',
      controller: 'QRcodeController as qr',
      access: {basic: false}
    })
    .when('/scanHarvest', {
      templateUrl: 'views/scan-harvest.html',
      controller: 'ScannerController',
      access: {basic: false}
    })
    .when('/scanStorage', {
      templateUrl: 'views/scan-storage.html',
      controller: 'ScannerController',
      access: {basic: false}
    })


    .otherwise({redirectTo: '/'});
}]);

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
  function (event, next, current) {
    //console.log(AuthService.isLoggedIn());
    if (next.access.basic && !AuthService.isLoggedIn()) {
      console.log("reroute - not logged in ");
      $location.path('/login');
      $route.reload();
    }
  });
});
