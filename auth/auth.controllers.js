(function() {
  'use strict';

  angular.module('readingIt.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['session', 'users'];
  function AuthController(session, users) {
    this.login = function(email) {
      users.findByEmail(email).then(function(user) {
        session.authenticate(user);
      });
    }

    this.register = function(email) {
      users.create({email: email}).then(function(user) {
        session.authenticate(user);
      });
    }
  }
})();
