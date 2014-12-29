'use strict';
(function () {

  angular
    .module('expenseTrackerApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'app/main/main.html',
          controller: 'MainCtrl',
          controllerAs:'im'
        });
    }]);
})();
