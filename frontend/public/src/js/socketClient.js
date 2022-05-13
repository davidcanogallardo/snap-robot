socket.on('initialArmPosition', function (data) {
    console.log("[socket] initialPosition",data);
    arm.initialPos(data)
})

socket.on('positionArm2', function (data) {
    console.log("[socket] posicionar brazo",data);
    arm.positionArm(data)
})

socket.on('rotate', (data) =>  {
    console.log("[socket] rotar brazo",data);
    arm.newRotation(data)
})