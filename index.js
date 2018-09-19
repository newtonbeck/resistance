var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');

});

server.listen(3000, function() {
    console.log('Server listening on *:3000');
});