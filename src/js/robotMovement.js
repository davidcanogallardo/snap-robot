window.positionCylinders = function (eje1,eje2,eje3,eje4) {
    console.log(`posiciono cilindros ${eje1} ${eje2} ${eje3} ${eje4}`);
    socket.emit('sendArmPosition', {arm: "amarillo", position: eje1});
    socket.emit('sendArmPosition', {arm: "rojo", position: eje2});
    socket.emit('sendArmPosition', {arm: "rosa", position: eje3});
    socket.emit('sendArmPosition', {arm: "naranja", position: eje4});
}

window.moveCylinder = function (color,degrees) {
    console.log(`muevo cilindros ${color} ${degrees}`);
    socket.emit('sendRotation', {"arm": color, "degrees": degrees});
}

window.gett = function () {
    socket.emit("getCylindersPositions", function (response) {
        console.log(response.positions);
    })
}