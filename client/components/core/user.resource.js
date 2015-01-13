(function () {
  "use strict";

  angular
    .module('common.services')
    .factory('userResource',userResource);

  userResource.$inject = ['$resource'];

  function userResource($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
      },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller:'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id:'me'
          }
        },
        update: {
          method: 'PUT'
        }
      });
  }

}());

