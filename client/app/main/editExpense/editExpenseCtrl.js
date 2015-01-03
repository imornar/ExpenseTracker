'use strict';
(function(){
  angular
    .module('expenseTrackerApp')
    .controller('EditExpenseCtrl', EditExpenseCtrl);

    EditExpenseCtrl.$inject=['$stateParams','$location','Expense'];

      function EditExpenseCtrl($stateParams, $location, Expense) {
        var editExp = this;
        var id = $stateParams.id;

        Expense.get({ id: id }, function(expense) {
          editExp.temporary = expense;
        });

        editExp.saveExpense= function () {
          Expense.update({id: id}, editExp.temporary);
          $location.path('/');
        }

      };
})();
