(function () {
  "use strict";

  angular
    .module('common.services',['ngResource'])
    .factory('common',common);

  common.$inject = ['$location', '$q', '$rootScope', '$timeout', 'Modal', 'dataservice', 'Auth', '$filter'];

  function common($location, $q, $rootScope, $timeout, Modal, dataservice, Auth, $filter) {
      var service = {
        $location:$location,
        $filter:$filter,
        $rootScope:$rootScope,
        $broadcast: $broadcast,
        $emit: $emit,
        $on: $on,
        $q: $q,
        $timeout: $timeout,
        $watch: $watch,
        dataservice: dataservice,
        Auth: Auth,
        Modal: Modal
      };
    return service;
  }

  function $broadcast() {
    return $rootScope.$broadcast.apply($rootScope, arguments);
  }

  function $emit() {
    return $rootScope.$emit.apply($rootScope, arguments);
  }

  function $on() {
    return $rootScope.$on.apply($rootScope, arguments);
  }

  function $watch() {
    return $rootScope.$watch.apply($rootScope, arguments);
  }


}());
