(function () {
  "use strict";

  angular
    .module('expenseTrackerApp')
    .factory('socketio', socketio);

  socketio.$inject = ['$rootScope'];

  function socketio($rootScope) {
    var socket = io.connect(),
        service = {
          on: on,
          emit: emit
        };
    return service;

    function on(eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        })
      })
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback){
            callback.apply(socket, args);
          }
        })
      })
    }

  }

}());
