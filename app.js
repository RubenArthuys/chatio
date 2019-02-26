var app = require('express')();
var server = require('http');
var fs = require('fs');

server.listen(8080);

//Load index.html
var server = http.createServer(function(req, res) {
  fs.readFile('./index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

//Load socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.broadcast.emit('message', socket.pseudo + ' is connected');

  socket.on('new', function(pseudo) {
    socket.pseudo = pseudo;
  });
});


