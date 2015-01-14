(function () {
  'use strict';

  describe('Controller: EditExpenseCtrl', function () {
    var $httpBackend, EditExpenseCtrl, scope, expenses, controller;

    beforeEach(module('expenseTrackerApp'));

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;
      var editExp = controller("EditExpenseCtrl", { $scope: scope });
      EditExpenseCtrl = $controller('EditExpenseCtrl', {
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

    it('function editExp.saveNewExpense should send get request to "/api/expenses/id" and update expense', function () {
      var editExp = controller("EditExpenseCtrl", { $scope: scope });
      $httpBackend.when('GET', '/api/expenses').respond(200);
      $httpBackend.expectGET('/api/expenses').respond(200);
      console.log(expenses.length);
      $httpBackend.flush();
      expect(expenses[0].comment).toBe('comm1');
      $httpBackend.expectPUT('/api/expenses').respond(200);
      editExp.saveExpense(expenses[0].comment = 'comm111');
      $httpBackend.flush();
      expect(expenses[0].comment).toBe('comm111');

    });
  })

}());
