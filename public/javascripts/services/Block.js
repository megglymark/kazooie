angular.module('app')
  .factory('BlockService',
    ['$q', '$http', 'AuthService',
    function ($q, $http, AuthService) {

      return ({
        getBlocks: getBlocks,
        postBlocks: postBlocks
      });

      function getBlocks() {
        var promise = $http.get('/api/blocks')
        .success(function(data) {
          return data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        return promise;
      }

      function postBlocks(latlng,center) {
        var data = {};
        data.paths = latlng;
        data.center = center;
        data.user = AuthService.isLoggedIn();
        var promise = $http.post('/api/blocks', data)
        .success(function(data) {
          return data;
        })
        .error(function(data) {
          console.log('postBlocks: ' + data);
        });
        return promise;
      }
}]);
