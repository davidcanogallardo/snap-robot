window.positionCylinders = function (eje1,eje2,eje3,eje4) {
    console.log(`posiciono cilindros ${eje1} ${eje2} ${eje3} ${eje4}`);
    socket.emit('sendArmPosition2', {arm: "amarillo", degrees: eje1});
    socket.emit('sendArmPosition2', {arm: "rojo", degrees: eje2});
    socket.emit('sendArmPosition2', {arm: "rosa", degrees: eje3});
    socket.emit('sendArmPosition2', {arm: "naranja", degrees: eje4});
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