'use strict';
(function () {

angular.module('expenseTrackerApp')
  .controller('UserDataSettingsCtrl',['$scope', 'User', 'Auth', '$location', function ($scope, User, Auth, $location) {
    var data = this;
    data.errors = {};
    data.me = Auth.getCurrentUser();
    data.tempMe = {};
    data.tempMe = Object.create(data.me);

  data.saveUsersData= function () {
    User.update({id:data.tempMe._id},data.tempMe, function (response) {
      data.me.name = response.name;
      data.me.email = response.email;
    });
  };

    $scope.returnToExpenses= function () {
      $location.path('/');
    }
  }]);


})();
