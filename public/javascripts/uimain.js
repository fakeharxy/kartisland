var socket;
var ctx, w, h, canvasX, canvasY;
var imagesToLoad;
var game;
var playerIndex;

$(document).ready(function() {

  var canvas = $("#canvas")[0];
  var rect = canvas.getBoundingClientRect();
  canvasX = rect.left;
  canvasY = rect.top;
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  ctx = canvas.getContext("2d");
  w = $("#canvas").width();
  h = $("#canvas").height();

  ctx.font = "8pt Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("loading...", w / 2, h / 2);

  startSocket();
}

function startSocket() {
  socket = io();
  socket.emit("game", "joined the game");
  $('#message_form').submit(function() {
    var m = $('#m');
    if (m.val()) {
      socket.emit('game', m.val());
      m.val('');
    }
    return false;
  });
  socket.on('game', function(msg) {
    $('#messages').append($('<li style="color:' + msg.colour + '">').text(msg.msg));
    $("#chatarea").scrollTop($("#chatarea")[0].scrollHeight);
  });
  socket.on('alert', function(msg) {
    $('#alertMessage').stop(true, true).html(msg).show().delay(4000).fadeOut(1500);
  });
  socket.on('gameState', function(gameData) {
    game = gameData;
    if (game.playerIndex) {
      playerIndex = game.playerIndex;
      console.log('setting playerIndex: ' + playerIndex);
    }
    showControls();
    draw();
  });
  socket.on('gameUpdate', function(mergeData) {
    console.log(mergeData);
    for (var attr in mergeData) {
      game[attr] = mergeData[attr];
    }
    draw();
  });
  socket.emit("requestGame", "");
}

function showControls() {
  if (game.state == "setupPlayers") {
    $('#prepareControls').show();
    $('#turnControls').hide();
  } else {
    $('#prepareControls').hide();
    if (playerIndex == game.currentPlayer) {
      $('#turnControls').show();
    } else {
      $('#turnControls').hide();
    }
  }
}

function draw() {
  // reset canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, w, h);

  //draw objects
  //drawGame.call(game, ctx);
  Game.draw.call(game, ctx);
}

function playerReady() {
  socket.emit("ready", "");
}

function startGame() {
  socket.emit("startGame", "");
}

function clearRoute() {
  if (confirm('Are you sure you want to clear your route? \n This can not be undone.')) {
    socket.emit('clearRoute', '');
  }
}

function clearHand() {
  if (confirm('Are you sure you want to clear your hand? \n This can not be undone.')) {
    socket.emit('clearHand', '');
  }
}

function finishRoute() {
  socket.emit('completeExtraction', '');
}

function endTurn() {
  socket.emit('endTurn', '');
}

function onMouseMove(event) {
  //game.onmousemove(event.pageX - canvasX, event.pageY - canvasY);
  //TODO: send the calculated co-ords to the server instead?
}

function onMouseDown(event) {
  //send the calculated co-ords to the server
  socket.emit('mouseDown', {
    x: event.pageX - canvasX,
    y: event.pageY - canvasY
  });
}
