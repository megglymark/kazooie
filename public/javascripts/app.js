var app = angular.module('app', ['ngRoute','ngMap','ngMaterial','monospaced.qrcode','qrScanner']).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('yellow')
    .warnPalette('red')
    .backgroundPalette('grey');
});

app.run(function ($rootScope, $timeout) {
  /*
  $rootScope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      componentHandler.upgradeAllRegistered();
    })
  })
  */
});

