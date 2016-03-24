var app = angular.module('app', ['ngRoute','ngMap']);

app.run(function ($rootScope, $timeout) {
  $rootScope.$on('$viewContentLoaded', function() {
    $timeout(function() {
      componentHandler.upgradeAllRegistered();
    })
  })
});
