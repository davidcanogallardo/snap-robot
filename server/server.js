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

var positions;
// rotacion actual de los ejes del robot
var positions = {
  amarillo: {_x:0,_y:0,_z:0},
  rojo: {_x:0,_y:0,_z:0},
  rosa: {_x:0,_y:0,_z:0},
  naranja: {_x:0,_y:0,_z:0}
};

io.on('connection', (socket) => {
    socket.emit('initialArmPosition', positions);
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('sendRotation', (data) => {
    socket.broadcast.emit('rotate', data);
  });


  socket.on('sendArmPosition2', (data) => {
    socket.broadcast.emit('positionArm2', data);
  });

  // socket.on("getArmPositions", (callback) => {
  //   // enviar las posiciones de verdad
  //   callback({positions})
  // });
  
  socket.on("updateArmRotation", (data) => {
    positions = data
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