'use strict';
(function () {

angular.module('expenseTrackerApp')
  .directive('myDatePicker', function () {
    return {
      templateUrl: 'components/directives/myDatePicker/myDatePicker.html',
      restrict: 'A',
      scope: {date: '='},
      link: function (scope, element, attrs) {
        scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          scope.opened = true;
        };
      }
    };
  });
})();
