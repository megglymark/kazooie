var app = angular.module('app', ['ngRoute']);

app.run(function ($rootScope, $timeout) {
  $rootScope.$on('$viewContentLoaded', () => {
    $timeout(() => {
      componentHandler.upgradeAllRegistered();
    })
  })
});
