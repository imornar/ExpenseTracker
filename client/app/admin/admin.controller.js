'use strict';
(function () {


angular.module('expenseTrackerApp')
  .controller('AdminCtrl',['$scope', '$http', 'Auth', 'User','Modal','$timeout', function ($scope, $http, Auth, User, Modal,$timeout) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    $scope.errors = '';



    $scope.delete =function(user) {
      var role= Auth.getCurrentUser().role;
      if(user.role!='admin'){
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      })}else{
        $scope.errors='you are not allowed to delete admin';
        $timeout(function () {
          $scope.errors = '';
        },1000);
      };
     }
  }]);
})();
