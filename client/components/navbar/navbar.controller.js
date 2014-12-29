'use strict';
(function () {


angular.module('expenseTrackerApp')
  .controller('NavbarCtrl',['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.dropdown =[
      {"text": "<i class='fa fa-user'></i><span>&nbsp;My Profile</span>",
        "href": "userDataSettings"}, {
        "text": '<i class="fa fa-key"></i><span>&nbsp;My Passwod</span>',
        "href": "settings"},{
        "divider":true},{
      "text": "<i class='glyphicon glyphicon-log-out'></i><span>&nbsp;LogOut</span>",
      "click": "logout()" }];

  }]);
})();

