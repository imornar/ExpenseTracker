'use strict';
(function () {
angular.module('expenseTrackerApp')
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/password.settings.html',
        controller: 'PasswordSettingsCtrl',
        authenticate: true
      })
      .state('userDataSettings', {
       url: '/userDataSettings',
       templateUrl: 'app/account/settings/user.data.settings.html',
       controller: 'UserDataSettingsCtrl',
        controllerAs:'data',
       authenticate: true
    });
  }]);

})();
