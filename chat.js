var net = require('net');
var clients = [];

var server = net.createServer(function(socket)  {
    clients.push(socket);

    socket.on('end', function() {
        var i = clients.indexOf(socket);
        clients.splice(i, 1);
    });

    socket.on('data', function(msg) {
        for (var i=0; i < clients.length; i++) {
            if (clients[i] !== socket) {
                clients[i].write('-> ' + msg);
            }
        }
    });
});

server.listen(9000);