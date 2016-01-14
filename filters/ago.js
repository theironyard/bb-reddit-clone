(function() {
  'use strict';

  angular.module('readingIt.filters')
    .filter('ago', ago);

  function ago() {
    return function(input) {
      return moment( new Date(input) ).fromNow();
    }
  }
})();
