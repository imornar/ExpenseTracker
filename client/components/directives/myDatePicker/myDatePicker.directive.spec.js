'use strict';

describe('Directive: myDatePicker', function () {

  // load the directive's module and view
  beforeEach(module('expenseTrackerApp'));
  beforeEach(module('components/myDatePicker/myDatePicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-date-picker></my-date-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myDatePicker directive');
  }));
});