'use strict';
(function(){
  angular
    .module('expenseTrackerApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject=['$scope','Expense', 'Auth', 'ngTableParams','$filter','DatePrototypes'];

      function MainCtrl($scope, Expense, Auth, ngTableParams, $filter, DatePrototypes) {
        var im = this;
        im.expenses = [];
        im.me = {};
        im.me = Auth.getCurrentUser();
        im.filters = {};
        im.selectedWeek = 0;
        im.search = '';
        im.tempExpenses = [];

        Expense.query({userId: im.me._id}, function (expenses) {
          im.me = Auth.getCurrentUser();
          assignWeekOfYear(expenses);
          recalculateExpenses(expenses);
          im.expenses = expenses;
          im.tableParams.reload();
        });

        im.refreshWeek = function () {
          if(im.selectedWeek!=null){
          im.filters.dateFrom = new Date(im.selectedWeek.getFullYear(),im.selectedWeek.getMonth(),(im.selectedWeek.getDate()) - 3);
          im.filters.dateTo = new Date(im.selectedWeek.getFullYear(),im.selectedWeek.getMonth(),(im.selectedWeek.getDate()) + 3);}
        };

        var deleteCallback = function (input) {
          var index = im.expenses.indexOf(input);
          im.expenses.splice(index,1);
          Expense.delete({id: input._id});
          recalculateExpenses(im.expenses);
          im.tableParams.reload();
        };

        im.deleteExpense =  function (expense) {
          deleteCallback(expense);
        };

        var recalculateExpenses = function (expenses) {
          angular.forEach(expenses, function (expense) {
            var temp = 0;
            var counter = 0;
            angular.forEach(expenses, function (exp) {
              if(expense.weekOfYear===exp.weekOfYear){
                counter++;
                temp += exp.amount;
              }
              });
            expense.counter = counter;
            expense.weekSum = temp;
            expense.averagePerWeek = temp / counter;
          });
        };

        var assignWeekOfYear = function (expenses) {
          angular.forEach(expenses, function (expense) {
            var tempDate = new Date(expense.dateTime);
            expense.weekOfYear = tempDate.getWeekYear() + ' Year, week number: ' + tempDate.getWeek();
          })
        };

        im.tableParams = new ngTableParams({
          page: 1,            // show first page
          count: 25,       // count per page
          filter:{},
          sorting: {
            dateTime: 'asc'     // initial sorting
          }
        }, {
          groupBy: 'weekOfYear',
          counts:[5, 10, 15, 25, 50, 100],
          total: function () { return getData().length; },
          getData: function ($defer, params) {
            params.total(im.expenses.length);
            var orderedData = params.sorting() ?
              $filter('orderBy')(im.expenses, im.tableParams.orderBy()) :
              im.expenses;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
          }
        });
        im.tableParams.settings().$scope = $scope;
    }

})();
