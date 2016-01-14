(function() {
  'use strict';

  angular.module('readingIt.stories')
    .directive('storyInfo', storyInfo);

  storyInfo.$inject = ['comments', 'users'];
  function storyInfo(comments, users) {
    return {
      restrict: 'E',
      scope: {
        story: '=',
        showComments: '@'
      },
      controller: function($scope) {
        users.find($scope.story.submitter_id).then(function(user) {
          $scope.user = user;
        });

        comments.findByStoryId($scope.story.id).then(function(comments) {
          $scope.comments = comments;
        });
      },
      templateUrl: 'views/stories/story-info.html'
    }
  }
})();
