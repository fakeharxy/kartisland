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

// app.use('/', router);


app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

io.use(function(socket, next) {
  session(socket.handshake, {}, next);
});

io.on('connection', function(socket) {
  console.log('io connection started using session id ' + socket.handshake.session.uid);

  socket.on('disconnect', function() {
    var uid = this.handshake.session.uid;
    console.log('io disconnect with session id ' + uid);
    //TODO: should remove from client list
  });
})
