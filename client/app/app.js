(function () {
  "use strict";

  angular.module('expenseTrackerApp', [
  'common.services',
  'ngCookies',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'mgcrea.ngStrap',
  'mgcrea.ngStrap.dropdown',
  'mgcrea.ngStrap.tooltip',
  'mgcrea.ngStrap.helpers.dateParser',
  'ngAnimate',
  //'fakeServer',
  'ngTable'
])
  .constant('routes',getRoutes())
  .factory('authInterceptor',authInterceptor)
  .config(routeConfigurator)
  .run(runActivator);

  authInterceptor.$inject=['$cookieStore', '$q', '$location'];
  routeConfigurator.$inject =['$stateProvider','$urlRouterProvider', '$locationProvider', '$httpProvider', 'routes'];
  runActivator.$inject = ['$rootScope', '$location', 'Auth'];

  function runActivator($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  }

  function authInterceptor($cookieStore, $q, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },
      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  }

  function routeConfigurator($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, routes) {
    $urlRouterProvider
      .otherwise('/');

    routes.forEach(function (route) {
      $stateProvider.state(route.state, route.config)
    });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function getRoutes() {
   return [
     {
       state:'main',
       config:{
         url:'/',
         templateUrl: 'app/main/main.html',
         authenticate: true
       }
     }, {
       state: 'new',
       config:{
         url: '/new',
         templateUrl: 'app/main/newExpense/newExpense.html',
         authenticate: true
       }
     }, {
       state: 'edit',
       config:{
         url: '/edit/:id',
         templateUrl: 'app/main/editExpense/editExpense.html',
         authenticate: true
     }
     },{
       state: 'admin',
       config:{
         url: '/admin',
         templateUrl: 'app/admin/admin.html',
         authenticate: true
     }
     },{
       state: 'login',
       config:{
         url: '/login',
         templateUrl: 'app/account/login/login.html'
     }
     },{
       state: 'signup',
       config:{
         url: '/signup',
         templateUrl: 'app/account/signup/signup.html'
     }
     },{
       state: 'settings',
       config:{
         url: '/settings',
         templateUrl: 'app/account/settings/password.settings.html',
         authenticate: true
     }
     },{
       state: 'userDataSettings',
       config:{
         url: '/userDataSettings',
         templateUrl: 'app/account/settings/user.data.settings.html',
         authenticate: true
     }
     }
   ]
  }

})();
