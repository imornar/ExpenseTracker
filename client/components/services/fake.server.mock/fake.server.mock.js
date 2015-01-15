(function () {
  "use strict";

  angular
      .module('fakeServer', ['ngMockE2E'])
      .run(activate);


  activate.$inject = ['$httpBackend'];

  function activate($httpBackend) {
      var expenses = [
          {_id:1,description:'expense.no.1', comment:'comment.no.1', amount:'1', dateTime:new Date(), userId:1, daySum:1},
          {_id:2,description:'expense.no.2', comment:'comment.no.2', amount:'2', dateTime:new Date(), userId:3, daySum:2},
          {_id:3,description:'expense.no.3', comment:'comment.no.3', amount:'3', dateTime:new Date(), userId:4, daySum:3},
          {_id:4,description:'expense.no.4', comment:'comment.no.4', amount:'4', dateTime:new Date(), userId:3, daySum:4},
          {_id:5,description:'expense.no.5', comment:'comment.no.5', amount:'5', dateTime:new Date(), userId:5, daySum:5}
          ];

      var users = [
          {email:'Ivan', password:'Ivan', role:'admin'},
          {email:'Jure', password:'Jure', role:'user'}
          ];

      var expensesUrl = "/api/expenses";
      var userUrl = "/api/users";
      $httpBackend.whenGET(expensesUrl).respond(expenses);
      $httpBackend.whenGET(userUrl).respond(users);
      $httpBackend.whenGET("/api/users/me").respond(users[0]);
    }

}());
