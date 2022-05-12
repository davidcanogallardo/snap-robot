class Snap {
    constructor(options, socket) {
        this.world;
        this.options = options
        this.useSocket = options?.useSocket
        this.socket = socket
        this.init()
    }

    init() {
        var loop = () => {
            requestAnimationFrame(loop);
            this.world.doOneCycle();
        }
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
        this.importProject()
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

    importProject() {
        var project = '<project name="a" app="Snap! 7, https://snap.berkeley.edu" version="2"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAAAXNSR0IArs4c6QAAAq1JREFUeF7t1zGqE1EAhtF7s5ekswquwmrqFIK1TcBtWFprn5Rp3YBrkKzDVGP1GuEJIuSD4Uw7Az/z3QPDzOFSICwww23TCgwAIUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUATPMbB5CBtACAaX7jADKQFgAwzW8cQAbSAgCm+Y0DyEBaAMA0v3EAGUgLAJjmNw4gA2kBANP8xgFkIC0AYJrfOIAMpAUAfCX/8Xhcz+fzOJ1OX+ecH9JT2vA4gK8c7rqu75dl+fZy+36/j+v1Ovb7/ac55+cNm3jqqwH4l9zruv5YluXtn4/sdrvxeDzG7XZ7jDHezTm/P/XUNjQG4P8B/DXGeDPn/LkhE099FQD/4RN8uVzG4XD4OOf88tRT2vAYgH5CUt4ApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3ziADKQFAEzzGweQgbQAgGl+4wAykBYAMM1vHEAG0gIApvmNA8hAWgDANL9xABlICwCY5jcOIANpAQDT/MYBZCAtAGCa3/hvQgQ4ea0X0+IAAAAASUVORK5CYII=</thumbnail><scenes select="1"><scene name="a"><notes></notes><hidden></hidden><headers></headers><code></code><blocks><block-definition s="eje1" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>amarillo</l></block></script></block-definition><block-definition s="eje2" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rojo</l></block></script></block-definition><block-definition s="eje3" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rosa</l></block></script></block-definition><block-definition s="eje4" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>naranja</l></block></script></block-definition><block-definition s="posicionar por defecto" type="command" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doRun"><block s="reportJSFunction"><list></list><l>snap.positionCylinders(0,0,0,0)</l></block><list></list></block></script></block-definition><block-definition s="posicionar ejes: %&apos;eje1&apos; %&apos;eje2&apos; %&apos;eje3&apos; %&apos;eje4&apos;" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%n"></input><input type="%n"></input><input type="%n"></input><input type="%n"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje1</l><l>eje2</l><l>eje3</l><l>eje4</l></list><l>snap.positionCylinders(eje1,eje2,eje3,eje4)</l></block><list><block var="eje1"/><block var="eje2"/><block var="eje3"/><block var="eje4"/></list></block></script></block-definition><block-definition s="mover eje %&apos;eje&apos; %&apos;grados&apos; º" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%s"></input><input type="%s"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje</l><l>grados</l></list><l>snap.moveCylinder(eje,grados)</l></block><list><block var="eje"/><block var="grados"/></list></block></script></block-definition></blocks><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="false" hyperops="true" codify="false" inheritance="true" sublistIDs="false" id="63"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAAAXNSR0IArs4c6QAADoVJREFUeF7t1cEJAAAIxDDdf2m3sJ+4wEEQuuMIECBAgACBd4F9XzRIgAABAgQIjAB7AgIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECByxcQFpoRMBzwAAAABJRU5ErkJggg==</pentrails><costumes><list struct="atomic" id="64"></list></costumes><sounds><list struct="atomic" id="65"></list></sounds><variables></variables><blocks></blocks><scripts></scripts><sprites select="1"><sprite name="Sprite" idx="1" x="0" y="0" heading="90" scale="1" volume="100" pan="0" rotation="1" draggable="true" costume="0" color="80,80,80,1" pen="tip" id="70"><costumes><list struct="atomic" id="71"></list></costumes><sounds><list struct="atomic" id="72"></list></sounds><blocks></blocks><variables></variables><scripts><script x="129.390243902439" y="65.42276422764225"><custom-block s="posicionar por defecto"></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje1"></custom-block><l>60</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje2"></custom-block><l>60</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje3"></custom-block><l>-60</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje4"></custom-block><l>360</l></custom-block></script></scripts></sprite></sprites></stage><variables></variables></scene></scenes></project>'
        window.this.openProjectString(project)
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
