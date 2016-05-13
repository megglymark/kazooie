angular.module('app')
  .factory('BoxService',
    ['$q', '$http', 'AuthService',
    function ($q, $http, AuthService) {
      return ({
        getBoxes: getBoxes,
        postBox: postBox
      });

      function getBoxes() {
        var promise = $http.get('/api/boxes')
        .success(function(data) {
          return data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
        return promise;
      }

      function postBox(box) {
        var data = {};
        data.box = box;
        data.user = AuthService.isLoggedIn();
        var promise = $http.post('/api/boxes', data)
        .success(function(data) {
          return data;
        })
        .error(function(err) {
          console.log('postBoxes: ' + err);
        });
        return promise;
      }
        
  }]);
