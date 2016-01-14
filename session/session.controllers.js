(function() {
  'use strict';

  angular.module('readingIt.session')
    .controller('SessionController', SessionController);

  SessionController.$inject = ['session'];
  function SessionController(session) {
    this.authenticate = session.authenticate;
    this.invalidate = session.invalidate;
    this.isAuthenticated = session.isAuthenticated;
  }
})();
