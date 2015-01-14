'use strict';
(function () {

  angular
    .module('expenseTrackerApp')
    .controller('NewExpenseCtrl', NewExpenseCtrl);

  NewExpenseCtrl.$inject = ['expenseResource', 'common'];

  function NewExpenseCtrl(expenseResource,common) {
    var newExp = this;
    newExp.temporary = {};
    newExp.temporary.dateTime = new Date();
    newExp.temporary.dateTime.setSeconds(null);
    newExp.temporary.dateTime.setMilliseconds(null);
    newExp.me = {};
    $('#focus').focus();



    newExp.saveNewExpense= function (input) {
      input.daySum=input.amount;
      expenseResource.save(input);
      common.$location.path('/');
    };

  }

})();
