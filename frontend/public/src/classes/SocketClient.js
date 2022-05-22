class SocketClient {
    constructor() {
        this.socket = io(socketUrl)
        this.connected = false
    }
    connectToRoom(roomId, cb) {
        console.log(roomId);
        this.socket.emit("joinRoom", roomId, (data) => {
            if (data.roomExists) {
                console.log(`existe la sala1112 ${roomId}`);
                this.roomId = roomId
                this.socketOn()
                this.connected = true
                console.log("1");
                // Si el brazo aún no ha cargado la funcion setArmRotationFromRoom no funciona
                // porque no existen las variables dle brazo
                if (arm.isRendered) {
                    arm.setArmRotationFromRoom(data.armPositions)
                } else {
                    arm.setArmRotations(data.armPositions)
                }
            } else {
                console.log("no existe la sala1112");
                this.connected = false
                this.roomId = null
            }

            if (cb) {
                cb(data.roomExists)
            }
        })
    }

    emitMove(data) {
        this.socket.emit('sendRotation', data);
    }

    emitSetPosition(data) {
        this.socket.emit('sendArmPosition2', data);
    }

    emitUpdateRoation(armRotations) {
        this.socket.emit("updateArmRotation", armRotations)
    }

    disconnect() {
        this.socket.emit("leaveRoom")
        this.connected = false
    }

    isConnected() {
        return this.connected;
    }

    socketOn() {
        this.socket.on('initialArmPosition', function (data) {
            console.log("[socket] initialPosition",data);
            window.ip = data
            arm.setArmRotations(data)
        })
        
        this.socket.on('positionArm2', function (data) {
            console.log("[socket] posicionar brazo",data);
            arm.setArmRotation(data)
        })
        
        this.socket.on('rotate', (data) =>  {
            console.log("[socket] rotar brazo",data);
            arm.newRotation(data)
        })
        // no funciona
        this.socket.on('togglePauseResume', () =>  {
            arm.togglePauseResume()
        })
        // no funciona
        this.socket.on('stopQueue2', () =>  {
            console.log("[socket] stop cola");
            arm.stopQueue()
        })
    }
}