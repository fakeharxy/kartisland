module.exports = {

  init: function(io, app) {
    var nsp = io.of('/lobby');
    nsp.on('connection', function(socket) {
      socket.on('setname', function(newname) {
        var uid = this.handshake.session.uid;
        var oldname = app.clients[uid].name;
        console.log('setname from uid ' + uid + ' (' + oldname + ' -> ' + newname + ')');
        app.clients[uid].name = newname;
        io.emit('lobby', oldname + ' changed name to ' + newname);
      });

      socket.on('getname', function() {
        var uid = this.handshake.session.uid;
        console.log('getname from uid ' + uid + ' (' + app.clients[uid].name + ')');
        socket.emit('setname', app.clients[uid].name);
      });

      socket.on('lobby', function(msg) {
        var uid = this.handshake.session.uid;
        console.log('lobby message from client ' + uid + ' (' + app.clients[uid].name + ') : ' +
          msg);
        io.emit('lobby', app.clients[uid].name + ': ' + msg);
      });
    });
  }

}
