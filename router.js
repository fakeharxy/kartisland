var express = require('express')
var router = express.Router()

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  checkSessionId(req);
  next()
})

router.use(express.static('public'));

router.get('/', function(req, res) {
  res.sendfile('public/lobby.html');
});

function checkSessionId(req) {
  if (req.session.uid && req.app.clients[req.session.uid]) {
    console.log('request using active session ' + req.session.uid + " (" + req.app.clients[req.session.uid]
      .name + ")");
    return true;
  } else {
    var uid = Date.now();
    req.session.uid = uid;
    var newplayer = {
      name: "annnnnonnn"
    };
    req.app.clients[uid] = newplayer;
    console.log('new session! assigned id ' + uid);
    return false;
  }
}

module.exports = router
