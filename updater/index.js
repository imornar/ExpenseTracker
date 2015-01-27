(function (updater) {
  "use strict";

  var socketio = require('socket.io');

  updater.init= function (server) {
    var messages = [];
    var io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {

      socket.on('messageChange', function (data) {
        console.log(data);
        socket.emit('receive',
          data.message.split('').reverse().join('')
        );
      });


    })
  }

}(module.exports));
