var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var game = {
    players: {

    }
};

app.get('/', function(_, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('join game', function(player) {
        game.players[socket.id] = player;
    });
});

http.listen(3000, function() {
    console.log('Server listening on *:3000');
});