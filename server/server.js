const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server , {  
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// rotacion actual de los ejes del robot
var positions = {
    amarillo: 0,
    rojo: 0,
    rosa: 0,
    naranja: 0,
};

// rotación antigua
var oldValue = {
    amarillo: 0,
    rojo: 0,
    rosa: 0,
    naranja: 0,
};

io.on('connection', (socket) => {
    socket.emit('updateClient', positions);
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });
  socket.on('update', (msg) => {
    // console.log(msg);
    positions[msg.color] = msg.pos
    // Si la diferencia es mayor o menor de 0.2 respecto al valor 
    // anterior entonces hago un emit para que actualicen el resto de usuario
    if (oldValue[msg.color]+0.2< positions[msg.color] || oldValue[msg.color]-0.2> positions[msg.color]) {
        oldValue[msg.color] = positions[msg.color]
        socket.broadcast.emit('updateClient', positions);
    }
  });
  socket.on("getCylindersPositions", (callback) => {
    callback({positions})
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});