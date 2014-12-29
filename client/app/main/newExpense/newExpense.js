'use strict';
(function() {
  angular
    .module('expenseTrackerApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('new', {
          url: '/new',
          templateUrl: 'app/main/newExpense/newExpense.html',
          controller: 'NewExpenseCtrl',
          controllerAs: 'newExp'
        });
    }]);

})();
