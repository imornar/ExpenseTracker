'use strict';
(function(){

angular
  .module('expenseTrackerApp')
  .factory('Expense', Expense);

  Expense.$inject=['$resource'];

    function Expense($resource) {
      return $resource('/api/expenses/:id',{id:'@id'},{update:{method:'PUT'}})
    }

})();
