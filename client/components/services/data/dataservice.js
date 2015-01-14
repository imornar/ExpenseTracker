(function () {
  'use strict';

  angular
    .module('expenseTrackerApp')
    .factory('dataservice',dataservice);

  dataservice.$inject = ['expenseResource', 'userResource','DatePrototypes'];

  function dataservice( expenseResource, userResource, DatePrototypes) {
    var service = {
      getExpenses: getExpenses,
      getUsers: getUsers,
      recalculateExpenses: recalculateExpenses,
      assignWeekOfYear: assignWeekOfYear,
      deleteCallback: deleteCallback
    };
    return service;

    function deleteCallback(data, input) {
      var index = data.indexOf(input);
      data.splice(index, 1);
      expenseResource.delete({id: input._id});
      recalculateExpenses(data);
    }

    function getExpenses() {
      return expenseResource.query(function (expenses) {
        assignWeekOfYear(expenses);
        recalculateExpenses(expenses);
        return expenses;
      }, function (err) {
        console.log('Error detected in dataservice.getExpenses func: ', err);
      }).$promise
    }

    function getUsers() {
      return userResource.query(function (users) {
        return users;
      }).$promise
    }

    function recalculateExpenses(expenses) {
      angular.forEach(expenses, function (expense) {
        var temp = 0;
        var counter = 0;
        angular.forEach(expenses, function (exp) {
          if (expense.weekOfYear === exp.weekOfYear) {
            counter++;
            temp += exp.amount;
          }
        });
        expense.counter = counter;
        expense.weekSum = temp;
        expense.averagePerWeek = temp / counter;
      });
    }

    function assignWeekOfYear(expenses) {
      angular.forEach(expenses, function (expense) {
        var tempDate = new Date(expense.dateTime);
        expense.weekOfYear = DatePrototypes.getWeekYear(tempDate) + ' Year, week number: ' + DatePrototypes.getWeek(tempDate);
      })
    }

  }
})();
