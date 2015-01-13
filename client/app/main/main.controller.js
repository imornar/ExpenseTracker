(function(){
'use strict';

  angular
    .module('expenseTrackerApp')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'ngTableParams', 'dataservice', 'common'];

function MainCtrl($scope, ngTableParams, dataservice, common) {
    var im = this;
    im.expenses = [];
    im.filters = {};
    im.selectedWeek = 0;
    im.search = '';
    im.tempExpenses = [];
    common.Auth.getCurrentUser().then(function (me) {
      im.me = me;
    });

   activate();

   function activate(){
   return getUserExpenses()
      .then(function (expenses) {
     })
      .catch(function (err) {
        console.log('Error detected in activate func: ', err);
      })
   }

   function getUserExpenses(){
     return dataservice.getExpenses()
       .then(function (expenses) {
           im.expenses = expenses;
           im.tableParams.reload();
           return im.expenses;
     })
       .catch(function (err) {
           console.log('Error detected in getUserExpenses func: ', err);
       })
   }
  https://github.com/imornar/ExpenseTracker

    im.refreshWeek = function () {
      if(im.selectedWeek!=null){
      im.filters.dateFrom = new Date(im.selectedWeek.getFullYear(),im.selectedWeek.getMonth(),(im.selectedWeek.getDate()) - 3);
      im.filters.dateTo = new Date(im.selectedWeek.getFullYear(),im.selectedWeek.getMonth(),(im.selectedWeek.getDate()) + 3);}
    };

    im.deleteExpense =  function (expense) {
      dataservice.deleteCallback(im.expenses, expense);
      im.tableParams.reload();
    };


  im.peoples=[
    {fname:'Ivan',lname:'Matic',bday:'1962/4/4', age:13},
    {fname:'Jure',lname:'Mornar',bday:'1972/4/4', age:33},
    {fname:'Pale',lname:'Lukic',bday:'1982/4/4', age:22},
    {fname:'Perko',lname:'Baric',bday:'1992/4/4', age:19},
    {fname:'dragica',lname:'vucic',bday:'2012/4/4', age:49},
    {fname:'Pasko',lname:'Matic',bday:'1978/4/4', age:58},
    {fname:'Denis',lname:'Subasic',bday:'1969/4/4', age:17},
    {fname:'Andrea',lname:'Platikosa',bday:'1989/4/4', age:36},
    {fname:'Marica',lname:'Kovac',bday:'2007/4/4', age:42},
    {fname:'Toni',lname:'Mandzukic',bday:'2009/4/4', age:12}
  ];












    im.tableParams = new ngTableParams({
      page:  1,
      count: 25,
      filter:{},
      sorting: {
        dateTime: 'asc'
      }
    }, {
      groupBy: 'weekOfYear',
      counts:[5, 10, 15, 25, 50, 100],
      total: function () { return getData().length; },
      getData: function ($defer, params) {
        params.total(im.expenses.length);
        var orderedData = params.sorting() ?
          common.$filter('orderBy')(im.expenses, im.tableParams.orderBy()) :
          im.expenses;
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
    im.tableParams.settings().$scope = $scope;
   }

})();
