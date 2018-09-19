var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.get('/', function(req, res) {
    res.send('<h1>Hello</h1>');
});

server.listen(3000, function() {
    console.log('Server listening on *:3000');
});