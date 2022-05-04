window.positionCylinders = function (eje1,eje2,eje3,eje4) {
    console.log(`posiciono cilindros ${eje1} ${eje2} ${eje3} ${eje4}`);
    socket.emit('update', {color: "amarillo", pos: eje1});
    socket.emit('update', {color: "rojo", pos: eje2});
    socket.emit('update', {color: "rosa", pos: eje3});
    socket.emit('update', {color: "naranja", pos: eje4});
}

window.moveCylinder = function (color,pos) {
    console.log(`muevo cilindros ${color} ${pos}`);
    socket.emit("getCylindersPositions", function (response) {
        var positions = response.positions
        var loops = (Math.abs(pos - positions[color]))/0.0009
        for (let i = 0; i < loops; i++) {
            socket.emit('update', {"color": color, "pos": positions[color]+(i*0.0009)});
        }
    })
}

window.gett = function () {
    socket.emit("getCylindersPositions", function (response) {
        console.log(response.positions);
    })
}