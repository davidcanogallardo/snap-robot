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
  amarillo: {_x:0,_y:0,_z:0},
  rojo: {_x:0,_y:0,_z:0},
  rosa: {_x:0,_y:0,_z:0},
  naranja: {_x:0,_y:0,_z:0}
};

var armPositions = {}

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    // console.log('user disconnected');
  });

  socket.on('stopQueue', () => {
    socket.to(socket.roomId).emit('stopQueue2');
  });
  socket.on('leaveRoom', () => {
    socket.leave(socket.roomId)
    socket.roomId = null
  });

  socket.on('createRoom', (callback) => {
    var roomId = "#"+(Math.random() + 1).toString(36).substring(6).toUpperCase();
    while (armPositions[roomId]) {
      roomId = "#"+(Math.random() + 1).toString(36).substring(6).toUpperCase();
    }
    armPositions[roomId] = JSON.parse(JSON.stringify(defaultPositions))
    
    callback({
      "roomId": roomId
    })
  })

  socket.on('roomExists', (roomId, callback) => {
    callback({
      "roomExists": this.roomExists(roomId)
    })
  })

  socket.on('joinRoom', (roomId, callback) => {
    if (roomExists(roomId)) {
      callback({
        roomExists: true,
        "armPositions": armPositions[roomId]
      })      
      joinRoom(socket, roomId)
    } else {
      callback({
        roomExists: false 
      }) 
    }
  })

  socket.on("owo", () => {
    console.log(`peticion owo ${socket.id}-${socket.roomId}`);
    socket.to(socket.roomId).emit('ewe');

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

function joinRoom(socket, roomId) {
  console.log(`someone joined ${roomId}`);
  // Lo saca de otra sala si ya estaba
  if (socket.roomId != null) {
    console.log("ya tenia una sala antes!");
    socket.leave(socket.roomId)
  }
  socket.join(roomId);
  socket.roomId = roomId
}

function roomExists(roomId) {
  if (!armPositions[roomId]) {
    return false
  } else {
    return true
  }
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});