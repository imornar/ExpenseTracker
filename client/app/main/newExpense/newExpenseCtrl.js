'use strict';
(function () {

  angular
    .module('expenseTrackerApp')
    .controller('NewExpenseCtrl', NewExpenseCtrl);

  NewExpenseCtrl.$inject = ['$scope','Expense', '$location','Auth'];

  function NewExpenseCtrl($scope,Expense,$location,Auth) {
    var newExp = this;
    newExp.temporary = {};
    newExp.temporary.dateTime = new Date();
    newExp.temporary.dateTime.setSeconds(null);
    newExp.temporary.dateTime.setMilliseconds(null);
    newExp.me = {};
    newExp.me = Auth.getCurrentUser();

    newExp.saveNewExpense= function () {
      newExp.temporary.daySum=newExp.temporary.amount;
      Expense.save(newExp.temporary);
      $location.path('/')
    };
    newExp.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };



  };

})();
