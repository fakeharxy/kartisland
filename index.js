var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var router = require('./router');
var lobby = require('./lobby');

app.clients = [];

var Session = require('express-session');
var SessionStore = require('session-file-store')(Session);
var session = Session({
  store: new SessionStore({
    path: './tmp/sessions'
  }),
  secret: 'secreshizzle',
  resave: true,
  saveUninitialized: true
});

app.use(session);
app.use(express.static('public'));

app.use('/', router);

http.listen(3000, function() {
  console.log('Kart Island listening on port 3000!')
})

//TODO move this 'use' to inside the game socket file like lobby
io.use(function(socket, next) {
  session(socket.handshake, {}, next);
});

lobby.init(io, app, session);

var Cell = require('./game/cell.js');
var cell = Object.create(Cell);
console.log("cell.type: " + cell.type);

/*io.on('connection', function(socket) {
  console.log('io connection started using session id ' + socket.handshake.session.uid);

  socket.on('disconnect', function() {
    var uid = this.handshake.session.uid;
    console.log('io disconnect with session id ' + uid);
    //TODO: should remove from client list
  });
})
*/
