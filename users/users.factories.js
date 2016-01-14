(function() {
  'use strict';

  angular.module('readingIt.users')
    .factory('users', usersFactory);

  usersFactory.$inject = ['$http'];
  function usersFactory($http) {
    function create(data) {
      return $http.post('https://morning-oasis-6754.herokuapp.com/users.json', data).then(function(response) {
        return response.data;
      });
    }

    function find(id) {
      return $http.get('https://morning-oasis-6754.herokuapp.com/users/' + id + '.json').then(function(response) {
        return response.data;
      });
    }

    function findByEmail(email) {
      return $http.get('https://morning-oasis-6754.herokuapp.com/users/find?email=' + email).then(function(response) {
        return response.data;
      });
    }

    return {
      create: create,
      find: find,
      findByEmail: findByEmail
    };
  }
})();
