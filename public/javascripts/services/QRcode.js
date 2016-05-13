angular.module('app')
  .factory('QRcodeService',
    ['$q', '$http', 'AuthService',
    function ($q, $http, AuthService) {
      return ({
        getQRcodes: getQRcodes
      });

      function getQRcodes() {
        var promise = $http.get('/api/qrcodes/10')
        .success(function(data) {
          return data;
        })
        .error(function(err) {
          console.log('Error: ' + data);
        });
        return promise;
      }
    }]);
