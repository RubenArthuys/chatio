var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ent = require('ent');

//Load index.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

io.sockets.on('connection', function (socket, pseudo) {

  socket.on('nouveau_client', function(pseudo) {
    pseudo = ent.encode(pseudo);
    socket.pseudo = pseudo;
    socket.broadcast.emit('nouveau_client', pseudo);
  });

  socket.on('message', function(message) {
    message = ent.encode(message);
    socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
  });
});

server.listen(8080);
