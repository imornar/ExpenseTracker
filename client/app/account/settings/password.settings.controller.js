'use strict';
(function () {

angular.module('expenseTrackerApp')
  .controller('PasswordSettingsCtrl',['$scope', 'User', 'Auth', '$location', function ($scope, User, Auth, $location) {
    $scope.errors = {};
    $('#password').focus();

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
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
      $location.path('/');
    }
  }]);
})();
