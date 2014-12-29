'use strict';
(function () {
  angular
    .module('expenseTrackerApp')
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('edit', {
          url: '/edit/:id',
          templateUrl: 'app/main/editExpense/editExpense.html',
          controller: 'EditExpenseCtrl',
          controllerAs: 'editExp'
        });
    }]);

})();
