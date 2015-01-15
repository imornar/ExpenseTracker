'use strict';
(function () {

angular.module('expenseTrackerApp')
  .controller('UserDataSettingsCtrl',UserDataSettingsCtrl);

  UserDataSettingsCtrl.$inject = ['$scope', 'userResource', 'common'];

  function UserDataSettingsCtrl($scope, userResource, common) {
    var data = this;
    data.errors = {};
    data.tempMe = {};
    common.Auth.getCurrentUser().then(function (me) {
      data.me = me;
      data.tempMe = Object.create(data.me);
    });

    data.saveUsersData= function () {
      userResource.update({id:data.tempMe._id},data.tempMe)
        .$promise.then(function (response) {
          data.me.name = response.name;
          data.me.email = response.email;
        }, function (err) {
          console.log(err);
        })
    };

    $scope.returnToExpenses= function () {
      common.$location.path('/');
    }
  };

})();
