socket.on('initialArmPosition', function (data) {
    console.log("[socket] initialPosition",data);
    window.ip = data
    arm.setInitialPositions(data)
})

socket.on('positionArm2', function (data) {
    console.log("[socket] posicionar brazo",data);
    arm.positionArm(data)
})

socket.on('rotate', (data) =>  {
    console.log("[socket] rotar brazo",data);
    arm.newRotation(data)
})
socket.on('togglePauseResume', () =>  {
    arm.togglePauseResume()
})
socket.on('stopQueue2', () =>  {
    console.log("[socket] stop cola");
    arm.stopQueue()
})