'use strict';
(function(){
  angular
    .module('expenseTrackerApp')
    .controller('EditExpenseCtrl', EditExpenseCtrl);

    EditExpenseCtrl.$inject=['$stateParams','common','expenseResource'];

      function EditExpenseCtrl($stateParams, common, expenseResource) {
        var editExp = this;
        var id = $stateParams.id;

        expenseResource.get({ id: id }, function(expense) {
          editExp.temporary = expense;
        });

        editExp.saveExpense= function (input) {
          expenseResource.update({id: id}, input);
          common.$location.path('/');
        }

      };
})();
