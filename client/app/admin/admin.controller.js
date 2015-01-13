'use strict';
(function () {

angular
  .module('expenseTrackerApp')
  .controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ['$scope', 'userResource', 'dataservice', 'common'];

    function AdminCtrl($scope, userResource, dataservice, common){

    $scope.errors = '';
    $scope.users = dataservice.getUsers();

    $scope.delete =function(user) {
      if(user.role!='admin'){
      userResource.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      })}else{
        $scope.errors='you are not allowed to delete admin';
        common.$timeout(function () {
          $scope.errors = '';
        },1000);
      }
     }

    }

})();
