var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var rules = [
    {
        players: {
            resistance: 3,
            spies: 2,
        },
    },
    {
        players: {
            resistance: 4,
            spies: 2,
        },
    },
    {
        players: {
            resistance: 4,
            spies: 3,
        },
    },
    {
        players: {
            resistance: 5,
            spies: 3,
        },
    },
    {
        players: {
            resistance: 6,
            spies: 3,
        },
    },
    {
        players: {
            resistance: 6,
            spies: 4,
        },
    }
];

var game = {
    players: [ ]
};

var rule;

app.get('/', function(_, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('join game', function(player) {
        game.players.push({
            socket: socket.id,
            name: player
        });
    });

    socket.on('start game', function() {
        rule = rules[game.players.length - 5];

        roles = Array(rule.players.resistance)
            .fill('resistance')
            .concat(
                Array(rule.players.spies)
                    .fill('spy')
            );

        shuffledRoles = roles
            .map(function(role) {
                return { sort: Math.random(), role: role };
            })
            .sort(function(a, b) {
                return a.sort - b.sort;
            })
            .map(function(element) {
                return element.role;
            });

        game
            .players
            .forEach(function(player, index) {
                player['role'] = shuffledRoles[index];
                if (socket.id === player.socket) {
                    socket
                        .emit('game started', player.role);
                } else {
                    socket
                        .broadcast
                        .to(player.socket)
                        .emit('game started', player.role);
                }
            });
    });
});

http.listen(3000, function() {
    console.log('Server listening on *:3000');
});