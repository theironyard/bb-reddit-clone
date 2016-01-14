(function() {
  'use strict';

  angular.module('readingIt.users')
    .directive('userInfo', userInfo);

  userInfo.$inject = ['session'];
  function userInfo(session) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      controller: function($scope) {
        $scope.user = session.getCurrentUser();
      },
      transclude: true,
      templateUrl: 'views/users/user-info.html'
    }
  }
})();
