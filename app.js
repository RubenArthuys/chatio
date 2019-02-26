var express = require('express');
var http = require('http');
var fs = require('fs');

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


server.listen(8080);