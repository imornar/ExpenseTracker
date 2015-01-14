(function () {
  'use strict';

  describe('Controller: NewExpenseCtrl', function () {
    var $httpBackend, NewExpenseCtrl, scope, expenses, controller;

    beforeEach(module('expenseTrackerApp'));

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;
      var newExp = controller("NewExpenseCtrl", { $scope: scope });
      NewExpenseCtrl = $controller('NewExpenseCtrl', {
        $scope: scope
      });
    }));

    beforeEach(function () {
      expenses = [
        {_id:1, description:'desc1', comment:'comm1', dateTime: new Date(), amount:111, daySum:111},
        {_id:2, description:'desc2', comment:'comm2', dateTime: new Date(), amount:222, daySum:222},
        {_id:3, description:'desc3', comment:'comm3', dateTime: new Date(), amount:333, daySum:333}];
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('function newExp.saveNewExpense should send POST request to "/api/expenses" and save new expense', function () {
      //var newExp = controller("NewExpenseCtrl", { $scope: scope });
      //TODO
    });
  })

}());
