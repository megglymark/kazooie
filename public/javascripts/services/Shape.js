angular.module('app')
  .factory('ShapeService',
    ['$q', '$http', 'AuthService',
    function ($q, $http, AuthService) {

      return ({
        getPolygons: getPolygons,
        postPolygons: postPolygons
      });

      function getPolygons() {
        var promise = $http.get('/api/blocks')
        .success(function(data) {
          return data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        return promise;
      }

      function postPolygons(latlng) {
        var data = {};
        data.paths = latlng;
        data.user = AuthService.isLoggedIn();
        $http.post('/api/blocks', data)
        .success(function(data) {
        })
        .error(function(data) {
        });
      }
}]);
