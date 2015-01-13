(function () {
'use strict';

angular.module('expenseTrackerApp')
  .controller('PasswordSettingsCtrl',['$scope', 'common', function ($scope, common) {
    $scope.errors = {};
    $('#password').focus();

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        common.Auth.changePassword($scope.user.oldPassword,$scope.user.newPassword)
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.returnToExpenses= function () {
      common.$location.path('/');
    }

  }]);

})();
