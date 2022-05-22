class ArmController {
    constructor() {
        
    }

    // Mueve el brazo 
    // si está conectado a una sala de socketio hace un emit
    move(data) {
        if (sc.isConnected()) {
            sc.emitMove(data)
            arm.newRotation(data, (data) => {
                console.log("actualizo posiciones para el servidor", data);
                sc.emitUpdateRoation(data)
            })
        } else {
            console.log("no actualizaré al servidor");
            arm.newRotation(data)
        }        
    }

    // Posiciona el brazo 
    // si está conectado a una sala de socketio hace un emit
    position(axis) {
        if (sc.isConnected()) {
            console.log("positionn");
            sc.emitSetPosition(axis[0])
            sc.emitSetPosition(axis[1])
            sc.emitSetPosition(axis[2])
            sc.emitSetPosition(axis[3])
            arm.setArmRotation(axis[0])
            arm.setArmRotation(axis[1])
            arm.setArmRotation(axis[2])
            arm.setArmRotation(axis[3], (data) => {
                sc.emitUpdateRoation(data)
                console.log("actualizo posiciones para el servidor", data);
            })
        
        } else {
            console.log("no actualizaré al servidor");
            arm.setArmRotation(axis[0])
            arm.setArmRotation(axis[1])
            arm.setArmRotation(axis[2])
            arm.setArmRotation(axis[3])
        }   
    }
}