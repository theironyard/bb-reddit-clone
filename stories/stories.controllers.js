(function() {
  'use strict';

  angular.module('readingIt.stories')
    .controller('StoriesIndexController', StoriesIndexController)
    .controller('StoriesCreateController', StoriesCreateController);

  StoriesIndexController.$inject = ['stories'];
  function StoriesIndexController(stories) {
    var vm = this;
    stories.findAll().then(function(result) {
      vm.stories = result;
    });
  }

  StoriesCreateController.$inject = ['$scope', '$state', 'stories', 'session'];
  function StoriesCreateController($scope, $state, stories, session) {
    var vm = this;
    var submitterId = session.getCurrentUser().id;

    $scope.create = function () {
      var data = {
        title: $scope.storyTitle,
        url: $scope.storyUrl,
        text: $scope.storyText,
        submitter_id: submitterId
      };
      return stories.create(data).then(function() {
        $state.go('stories');
      });
    }
  }
})();
