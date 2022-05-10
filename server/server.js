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

var defaultPositions;
// rotacion actual de los ejes del robot
var defaultPositions = {
  amarillo: {_x:0,_y:45,_z:0},
  rojo: {_x:0,_y:0,_z:0},
  rosa: {_x:0,_y:0,_z:0},
  naranja: {_x:0,_y:0,_z:0}
};

var armPositions = {}

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('leaveRoom', () => {
    socket.leave(socket.roomId)
    socket.roomId = null
  });

  socket.on('joinRoom', (roomId) => {
    // Lo saca de otra sala si ya estaba
    if (socket.roomId != null) {
      console.log("ya tenia una sala antes!");
      socket.leave(socket.roomId)
    }
    // Si es el creador de la sala, crea coordenadas para el robot
    if (armPositions[roomId] == null) {
      armPositions[roomId] = JSON.parse(JSON.stringify(defaultPositions))
    }
    // Le devuelve las coordenadas
    io.to(socket.id).emit('initialArmPosition',armPositions[roomId]);
    // Se une a la sala
    socket.join(roomId);
    socket.roomId = roomId
  })

  socket.on("owo", () => {
    console.log(`peticion owo ${socket.roomId}`);
    socket.to(socket.roomId).emit("uwu");
  })

  socket.on('sendRotation', (data) => {
    socket.to(socket.roomId).emit('rotate', data);
    // socket.broadcast.emit('rotate', data);
  });


  socket.on('sendArmPosition2', (data) => {
    socket.to(socket.roomId).emit('positionArm2', data);
  });

  socket.on("updateArmRotation", (data) => {
    console.log(`room ${socket.roomId} actualiza coords`);
    armPositions[socket.roomId] = data
    // defaultPositions = data
  });
  
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}