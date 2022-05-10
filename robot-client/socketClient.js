socket.on('initialArmPosition', function (data) {
    console.log("recibo rotaciones de servidor",data);
    all.rotation.set(data.amarillo._x, data.amarillo._y, data.amarillo._z);
    redPivot.rotation.set(data.rojo._x, data.rojo._y, data.rojo._z);
    pinkPivot.rotation.set(data.rosa._x, data.rosa._y, data.rosa._z);
    pivotGroup.rotation.set(data.naranja._x, data.naranja._y, data.naranja._z);
})

socket.on('positionArm2', function (data) {
    console.log("bloque de posicionar",data);
    switch (data.arm) {
        case "amarillo":
            all.rotation.set(0, THREE.Math.degToRad(data.degrees), 0);
            break;
        case "rojo":
            redPivot.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
            break;
    
        case "rosa":
            pinkPivot.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
            break;
        case "naranja":
            pivotGroup.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
            break;
    }
    updateArmRotation()
})

// window.position = function () {
//     all.rotation.y = 0
// }

// window.convert = function () {  
//     console.log(THREE.Math.radToDeg(all.rotation.y));
//     console.log(THREE.Math.degToRad(all.rotation.y));
// }

rotationQueue = []

socket.on('rotate', (data) =>  {
    console.log(`roto ${data.arm} ${data.degrees}`);
    if (rotationQueue.length > 0) {
        rotationQueue[rotationQueue.length] = data
    } else {
        rotationQueue[rotationQueue.length] = data
        startRotation(data)
    }
})

function startRotation(data) {
    nLoops = Math.abs(data.degrees)
    currentLoop = 1
    // Math.sign devuelve -1 si le pasa un número negativo o 1 si le pasas uno positivo
    degrees = Math.sign(data.degrees)
    myLoop(updateArmRotation, data.arm)
}

function myLoop(callback, armToRotate) {  
    setTimeout(() => {  
        rotateArm(armToRotate, degrees)
        currentLoop++;          
        if (currentLoop < nLoops) {  
            myLoop(callback, armToRotate);             
        } else {
            callback()
            rotationQueue.shift()
            if (rotationQueue.length > 0) {
                startRotation(rotationQueue[0])
            }
            console.log("termino");
        }                  
    }, 1)
}

function updateArmRotation() {
    socket.emit('updateArmRotation', {
        amarillo: all.rotation, 
        rojo: redPivot.rotation, 
        rosa: pinkPivot.rotation, 
        naranja: pivotGroup.rotation, 
    });
}

function rotateArm(arm, degrees) {
    switch (arm) {
        case "rojo":
            redPivot.rotateX(THREE.Math.degToRad(degrees))
            break;
        case "amarillo":
            all.rotateY(THREE.Math.degToRad(degrees))
            break;
        case "rosa":
            pinkPivot.rotateX(THREE.Math.degToRad(degrees))
            break;
        case "naranja":
            pivotGroup.rotateX(THREE.Math.degToRad(degrees))
            break;
    }
}