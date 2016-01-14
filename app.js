var readingIt = angular.module('readingIt', [
  'readingIt.auth',
  'readingIt.comments',
  'readingIt.filters',
  'readingIt.session',
  'readingIt.stories',
  'readingIt.users',
  'sky',
  'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

  $stateProvider

    // Public routes
    .state('home', {
      url: "/",
      templateUrl: "views/home.html"
    })
    .state('showstory', {
      url: "/stories/:id",
      templateUrl: "views/stories/stories.show.html",
      resolve: {story: fetchStory},
      controller: function($scope, story) {
        $scope.story = story;
      }
    })
    .state('stories', {
      url: "/stories",
      templateUrl: "views/stories/stories.html",
      controller: "StoriesIndexController",
      controllerAs: "sivm"
    })

    // Protected routes
    .state('submitstory', {
      url: "/submit",
      templateUrl: "views/stories/submitstory.html",
      controller: "StoriesCreateController",
      resolve: { authenticate: authenticate }
    })
    .state('me', {
      url: "/me",
      templateUrl: "views/users/me.html",
      resolve: { authenticate: authenticate },
      controller: function($scope, authenticate) {
        $scope.user = authenticate.user;
      }
    })
});

function fetchStory($stateParams, stories) {
  return stories.find($stateParams.id);
}
fetchStory.$inject = ['$stateParams', 'stories'];

// Adapted from http://stackoverflow.com/a/28267504
function authenticate($q, $state, $timeout, session) {
  if (session.isAuthenticated()) {
    // Resolve the promise successfully
    return $q.when({user: session.getCurrentUser()});
  } else {
    // The next bit of code is asynchronously tricky.

    $timeout(function() {
      // This code runs after the authentication promise has been rejected.
      // Go to the log-in page
      $state.go('home')
    })

    // Reject the authentication promise to prevent the state from loading
    return $q.reject()
  }
}
authenticate.$inject = ['$q', '$state', '$timeout', 'session'];
