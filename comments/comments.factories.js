(function() {
  'use strict';

  angular.module('readingIt.comments')
    .factory('comments', commentsFactory);

  commentsFactory.$inject = ['$http'];
  function commentsFactory($http) {
    function findByStoryId(id) {
      return $http.get('https://morning-oasis-6754.herokuapp.com/stories/' + id + '/comments.json').then(function(response) {
        return response.data;
      });
    }

    function create(data) {
      return $http.post('https://morning-oasis-6754.herokuapp.com/comments.json', data).then(function(response) {
        return response.data;
      });
    }

    return {
      findByStoryId: findByStoryId,
      create
    };
  }
})();
