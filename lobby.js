module.exports = {

  init: function(io, app, session) {
    var nsp = io.of('/lobby');

    //make sure this socket namespace uses sessions
    nsp.use(function(socket, next) {
      session(socket.handshake, {}, next);
    });

    nsp.on('connection', function(socket) {
      console.log('lobby socket connection started using session id ' + socket.handshake.session.uid);

      if (app.clients[socket.handshake.session.uid]) { //check the server still remembers this session id

        socket.on('setname', function(newname) {
          var uid = socket.handshake.session.uid;
          var oldname = app.clients[uid].name;
          console.log('setname from uid ' + uid + ' (' + oldname + ' -> ' + newname + ')');
          app.clients[uid].name = newname;
          nsp.emit('lobby', oldname + ' changed name to ' + newname);
        });

        socket.on('getname', function() {
          var uid = socket.handshake.session.uid;
          console.log('getname from uid ' + uid + ' (' + app.clients[uid].name + ')');
          socket.emit('setname', app.clients[uid].name);
        });

        socket.on('lobby', function(msg) {
          var uid = socket.handshake.session.uid;
          console.log('lobby message from client ' + uid + ' (' + app.clients[uid].name + ') : ' +
            msg);
          nsp.emit('lobby', app.clients[uid].name + ': ' + msg);
        });

      } else {
        console.log("(session no longer active; lobby connection ignored)"); //should send an expiration message to client to refresh the page
      }
    });

    console.log("[lobby init finished]");
  }

}
