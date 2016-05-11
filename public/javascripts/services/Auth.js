angular.module('app')
  .factory('AuthService',
    ['$q', '$timeout', '$http',
    function ($q, $timeout, $http) {

      var user = null;

      return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
      });

      function isLoggedIn() {
        if(user) {
          return user;
        } else {
          return false;
        }
      }

      function getUserStatus() {

        var deferred = $q.defer();

        $http.get('/user/status')
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data) {
          user = null;
          deferred.reject(data);
        });
        
        return deferred.promise;
      }

      function login(username, password) {

        var deferred = $q.defer();

        $http.post('/user/login', {username: username, password: password})

          .success(function (data, status) {
            if(status === 200 && data.status) {
              user = data.user;
              deferred.resolve();
            } else {
              user = null;
              deferred.reject();
            }
          })

          .error(function (data) {
            user = null;
            deferred.reject();
          });

        return deferred.promise;

      }

      function logout() {

        var deferred = $q.defer();

        $http.get('/user/logout')

          .success(function (data) {
            user = false;
            deferred.resolve(false);
          })

          .error(function (data) {
            user = false;
            deferred.reject(false);
          })

        return deferred.promise;

      }

      function register(user) {

        var deferred = $q.defer();

        $http.post('/user/register', {username: user.username, 
                                      password: user.password,
                                      company: user.company})

          .success(function (data, status) {
            if(status === 200 && data.status){
              deferred.resolve();
            } else {
              deferred.reject();
            }
          })

          .error(function (data) {
            deferred.reject();
          });

        return deferred.promise;

      }

}]);
