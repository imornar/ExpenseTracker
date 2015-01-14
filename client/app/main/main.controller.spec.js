(function () {
  'use strict';

  describe('Controller: MainCtrl', function () {
    var $httpBackend, MainCtrl, scope, expenses, controller;

    beforeEach(module('expenseTrackerApp'));

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller;
      var im = controller("MainCtrl", { $scope: scope });
      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));

    beforeEach(function () {
        expenses = [
          {_id:1, description:'desc1', comment:'comm1', dateTime: new Date(), amount:111},
          {_id:2, description:'desc2', comment:'comm2', dateTime: new Date(), amount:222},
          {_id:3, description:'desc3', comment:'comm3', dateTime: new Date(), amount:333}];
    });

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it("should expect get request (response 2 meals) and add them to im.expenses", function () {
      var im = controller("MainCtrl", { $scope: scope });
      $httpBackend.when('GET', '/api/expenses').respond(200, [expenses[0],expenses[1]]);
      $httpBackend.expectGET('/api/expenses').respond(200, [expenses[0],expenses[1]]);
      expect(im.expenses.length).toBe(0);
      $httpBackend.flush();
      expect(im.expenses.length).toBe(2);
    });

    it('function im.deleteExpense(expense) should send DELETE request to "/api/expenses/:id" and on success delete corresponding expense from im.expenses', function () {
      var im = controller("MainCtrl", { $scope: scope });
      $httpBackend.when('GET', '/api/expenses').respond(200, [expenses[0],expenses[1],expenses[2]]);
      $httpBackend.expectGET('/api/expenses').respond(200, [expenses[0],expenses[1],expenses[2]]);
      $httpBackend.flush();
      $httpBackend.expectDELETE('/api/expenses/' +im.expenses[0]._id).respond(204);
      im.deleteExpense(im.expenses[0]);
      $httpBackend.flush();
      expect(im.expenses.length).toBe(2);
      expect(im.expenses[0].description).toEqual('desc2');
      $httpBackend.expectDELETE('/api/expenses/' +im.expenses[0]._id).respond(204);
      im.deleteExpense(im.expenses[0]);
      $httpBackend.flush();
      expect(im.expenses.length).toBe(1);
      expect(im.expenses[0].description).toEqual('desc3');
    });
  })

}());
