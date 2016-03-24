angular.module('app')
  .factory('ShapeService',
    ['$q', '$http', 'AuthService',
    function ($q, $http, AuthService) {

      return ({
        getPolygons: getPolygons,
        postPolygons: postPolygons
      })

      function getPolygons() {
        $http.get('/api/polygons')
        .success(function(data) {
          console.log(data);
          return data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      }

      function postPolygons(latlng) {
        $http.post('/api/polygons', latlng)
        .success(function(data) {
        })
        .error(function(data) {
        });
      };
}]);
