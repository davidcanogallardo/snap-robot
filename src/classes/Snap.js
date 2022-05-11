class Snap {
    constructor(options, socket) {
        this.world;
        this.options = options
        this.useSocket = options?.useSocket
        this.socket = socket
        this.init()
    }

    init() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./snap/sw.js');
        }
        console.log();
        this.world = new WorldMorph(document.getElementById('world'));
        new IDE_Morph().openIn(this.world);
        
        // window.loop = this.loop
        window.world = this.world
        // this.world.doOneCycle()
        loop();
        this.importCustomBlocks()
        this.enableJS()

        if (this.useSocket == true) {
            this.connectToSocketRoom();
        }
    }

    enableJS() {
        Process.prototype.enableJS = true
    }
    
    importCustomBlocks() {  
        var blocks = '<blocks app="Snap! 7, https://snap.berkeley.edu" version="2"><block-definition s="eje1" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>amarillo</l></block></script></block-definition><block-definition s="eje2" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rojo</l></block></script></block-definition><block-definition s="eje3" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rosa</l></block></script></block-definition><block-definition s="eje4" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>naranja</l></block></script></block-definition><block-definition s="posicionar por defecto" type="command" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doRun"><block s="reportJSFunction"><list></list><l>snap.positionCylinders(0,0,0,0)</l></block><list></list></block></script></block-definition><block-definition s="posicionar ejes: %&apos;eje1&apos; %&apos;eje2&apos; %&apos;eje3&apos; %&apos;eje4&apos;" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%n"></input><input type="%n"></input><input type="%n"></input><input type="%n"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje1</l><l>eje2</l><l>eje3</l><l>eje4</l></list><l>snap.positionCylinders(eje1,eje2,eje3,eje4)</l></block><list><block var="eje1"/><block var="eje2"/><block var="eje3"/><block var="eje4"/></list></block></script></block-definition><block-definition s="mover eje %&apos;eje&apos; %&apos;grados&apos; º" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%s"></input><input type="%s"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje</l><l>grados</l></list><l>snap.moveCylinder(eje,grados)</l></block><list><block var="eje"/><block var="grados"/></list></block></script></block-definition></blocks>'
        window.this.openBlocksString(blocks,"Bloques robot",true)
    }

    positionCylinders(eje1, eje2, eje3, eje4) {
        console.log(`[snap] posiciono cilindros ${eje1} ${eje2} ${eje3} ${eje4}`);
        if (this.useSocket) {
            socket.emit('sendArmPosition2', {arm: "amarillo", degrees: eje1});
            socket.emit('sendArmPosition2', {arm: "rojo", degrees: eje2});
            socket.emit('sendArmPosition2', {arm: "rosa", degrees: eje3});
            socket.emit('sendArmPosition2', {arm: "naranja", degrees: eje4});
        }
        arm.positionArm({arm: "amarillo", degrees: eje1})
        arm.positionArm({arm: "rojo", degrees: eje2})
        arm.positionArm({arm: "rosa", degrees: eje3})
        arm.positionArm({arm: "naranja", degrees: eje4})
    }
    
    moveCylinder(color, degrees) {
        console.log(`[snap] roto cilindro: ${color} ${degrees}º`);
        if (this.useSocket) {
            console.log("y a través de socket!");
            socket.emit('sendRotation', {"arm": color, "degrees": degrees});
        }
        arm.newRotation({"arm": color, "degrees": degrees})
    }

    connectToSocketRoom(roomId) {
        this.roomId = roomId
        socket.emit('joinRoom', roomId);
        this.useSocket = true
    }

    disconnectFromSocketRoom(){
        socket.emit("leaveRoom")
        this.useSocket = false
    }

    createRoom() {
        return "#"+(Math.random() + 1).toString(36).substring(6).toUpperCase();
    }

    updateArmRotation(armRotations) {
        if (this.useSocket) {
            socket.emit("updateArmRotation", armRotations)
        }
    }
}
