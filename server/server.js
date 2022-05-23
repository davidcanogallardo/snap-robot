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

var allRoomsInfo = {}

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log("user disconnected");
    if (socket.controller) {
      allRoomsInfo[socket.roomId].canControl = true
    }
  });

  socket.on('stopQueue', () => {
    socket.to(socket.roomId).emit('stopQueue2');
  });
  socket.on('leaveRoom', () => {
    socket.leave(socket.roomId)
    socket.roomId = null
  });

  socket.on('createRoom', (callback) => {
    var roomId = (Math.random() + 1).toString(36).substring(8).toUpperCase();
    while (allRoomsInfo[roomId]) {
      roomId = (Math.random() + 1).toString(36).substring(8).toUpperCase();
    }
    var roomInfo = {
      positions:JSON.parse(JSON.stringify(defaultPositions)),
      canControl: true
    }
    allRoomsInfo[roomId] = roomInfo
    socket.controller = false

    console.log(roomId, roomInfo);

    callback({
      "roomId": roomId
    })
  })

  socket.on('roomExists', (roomId, callback) => {
    if (roomId) {
      callback({
        "roomExists": roomExists(roomId.toUpperCase())
      })
    } else {
      callback({
        roomExists: false 
      }) 
    }
  })

  socket.on('joinRoom', (roomId, snapUser,callback) => {
    if (roomId) {
      if (roomExists(roomId.toUpperCase())) {
        if (snapUser) {
          if (allRoomsInfo[roomId.toUpperCase()].canControl) {
            allRoomsInfo[roomId.toUpperCase()].canControl = false
            socket.controller = true
            console.log("canControll");
          } else {
            console.log("cantControll");
          }
          callback({
            roomExists: socket.controller,
            "armPositions": allRoomsInfo[roomId.toUpperCase()].positions
          })  
        } else {
          callback({
            roomExists: true,
            "armPositions": allRoomsInfo[roomId.toUpperCase()].positions
          })  

        }
    
        joinRoom(socket, roomId.toUpperCase())
      } else {
        callback({
          roomExists: false 
        }) 
      }
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
    if (socket.controller) {
      socket.to(socket.roomId).emit('rotate', data);
    }
  });

  socket.on('sendArmPosition2', (data) => {
    if (socket.controller) {
      socket.to(socket.roomId).emit('positionArm2', data);
    }
  });

  socket.on("updateArmRotation", (data) => {
    if (socket.controller) {
      console.log(`room ${socket.roomId} actualiza coords`);
      allRoomsInfo[socket.roomId].positons = data
    }
    
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
  if (!allRoomsInfo[roomId]) {
    return false
  } else {
    return true
  }
}

server.listen(3000, () => {
  console.log('listening on *:3000');
});
