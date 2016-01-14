(function() {
  'use strict';

  angular.module('readingIt.stories')
    .factory('stories', storiesFactory);

  storiesFactory.$inject = ['$http'];
  function storiesFactory($http) {
    function findAll() {
      return $http.get('https://morning-oasis-6754.herokuapp.com/stories.json').then(function(response) {
        return response.data;
      });
    }

    function find(id) {
      return $http.get('https://morning-oasis-6754.herokuapp.com/stories/'+ id +'.json').then(function(response) {
        return response.data;
      });
    }

    function create(data) {
      return $http.post('https://morning-oasis-6754.herokuapp.com/stories.json', data).then(function(response) {
        return response.data;
      });
    }

    return {
      findAll: findAll,
      find: find,
      create: create
    };
  }
})();
