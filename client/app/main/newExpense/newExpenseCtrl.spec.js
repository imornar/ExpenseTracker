'use strict';

describe('Controller: NewExpenseCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseTrackerApp'));

  var NewExpenseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewExpenseCtrl = $controller('NewExpenseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
