(function () {
  "use strict";

  angular
    .module('common.services')
    .factory('expenseResource',expenseResource);

  expenseResource.$inject=['$resource'];

  function expenseResource($resource){
    return $resource('/api/expenses/:id',{id:'@id'},{update:{method:'PUT'}})
  }
}());

