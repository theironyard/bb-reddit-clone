(function() {
  'use strict';

  angular.module('readingIt.session')
    .factory('session', sessionFactory);

  function sessionFactory() {
    var currentUserData = localStorage.getItem('currentUser');
    var currentUser = currentUserData && JSON.parse(currentUserData);

    function authenticate(user) {
      if(!user) return;
      currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    }

    function invalidate() {
      currentUser = null;
      localStorage.setItem('currentUser', null);
    }

    function isAuthenticated() {
      return !!currentUser;
    }

    function getCurrentUser() {
      return currentUser;
    }

    return {
      authenticate: authenticate,
      invalidate: invalidate,
      isAuthenticated: isAuthenticated,
      getCurrentUser: getCurrentUser
    };
  }
})();
