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
    newExp.me = common.Auth.getCurrentUser();
    $('#focus').focus();

    newExp.saveNewExpense= function () {
      newExp.temporary.daySum=newExp.temporary.amount;
      expenseResource.save(newExp.temporary);
      common.$location.path('/')
    };

  }

})();
