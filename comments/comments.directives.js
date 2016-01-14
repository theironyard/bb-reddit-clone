(function() {
  'use strict';

  angular.module('readingIt.comments')
    .directive('commentInfo', commentInfo)
    .directive('commentForm', commentForm);

  commentForm.$inject = ['comments', 'session'];
  function commentForm(comments, session) {
    return {
      restrict: 'E',
      scope: {
        story: '='
      },
      controller: function($scope) {
        var submitterId = session.getCurrentUser().id;
        var storyId = $scope.story.id;

        $scope.create = function() {
          comments.create({
            text: $scope.commentText,
            story_id: storyId,
            submitter_id: submitterId
          });
          $scope.commentText = "";
        }
      },
      templateUrl: 'views/comments/comment-form.html'
    }
  }

  commentInfo.$inject = ['users'];
  function commentInfo(users) {
    return {
      restrict: 'E',
      scope: {
        comment: '='
      },
      controller: function($scope) {
        users.find($scope.comment.submitter_id).then(function(user) {
          $scope.user = user;
        });
      },
      templateUrl: 'views/comments/comment-info.html'
    }
  }
})();
