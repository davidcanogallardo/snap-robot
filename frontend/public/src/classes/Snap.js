class Snap {
    constructor(options) {
        this.world;
        this.options = options
        this.remoteArm = options?.remoteArm
        this.armRoomId = options?.armRoomId
        // this.socket = socket
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
        var project = '<project name="a" app="Snap! 7, https://snap.berkeley.edu" version="2"><notes></notes><thumbnail>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAACIElEQVR4Xu3SMQ0AAAzDsJU/6cHI4xKoFHlnCoQFFn67VuAAhCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5wAykBYAMM3vHEAG0gIApvmdA8hAWgDANL9zABlICwCY5ncOIANpAQDT/M4BZCAtAGCa3zmADKQFAEzzOweQgbQAgGl+5w8zDAB5EXMqlAAAAABJRU5ErkJggg==</thumbnail><scenes select="1"><scene name="a"><notes></notes><hidden></hidden><headers></headers><code></code><blocks><block-definition s="eje1" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>amarillo</l></block></script></block-definition><block-definition s="eje2" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rojo</l></block></script></block-definition><block-definition s="eje3" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rosa</l></block></script></block-definition><block-definition s="eje4" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>naranja</l></block></script></block-definition><block-definition s="posicionar por defecto" type="command" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doRun"><block s="reportJSFunction"><list></list><l>snap.positionCylinders(0,0,0,0)</l></block><list></list></block></script></block-definition><block-definition s="posicionar ejes: %&apos;eje1&apos; %&apos;eje2&apos; %&apos;eje3&apos; %&apos;eje4&apos;" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%n"></input><input type="%n"></input><input type="%n"></input><input type="%n"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje1</l><l>eje2</l><l>eje3</l><l>eje4</l></list><l>snap.positionCylinders(eje1,eje2,eje3,eje4)</l></block><list><block var="eje1"/><block var="eje2"/><block var="eje3"/><block var="eje4"/></list></block></script></block-definition><block-definition s="mover eje %&apos;eje&apos; %&apos;grados&apos; º" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%s"></input><input type="%s"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje</l><l>grados</l></list><l>snap.moveCylinder(eje,grados)</l></block><list><block var="eje"/><block var="grados"/></list></block></script></block-definition></blocks><stage name="Stage" width="480" height="360" costume="0" color="255,255,255,1" tempo="60" threadsafe="false" penlog="false" volume="100" pan="0" lines="round" ternary="false" hyperops="true" codify="false" inheritance="true" sublistIDs="false" id="63"><pentrails>data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFoCAYAAACPNyggAAAOhUlEQVR4Xu3VwQkAAAjEMN1/abewn7jAQRC64wgQIECAAIF3gX1fNEiAAAECBAiMAHsCAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQICLAfIECAAAECgYAAB+gmCRAgQICAAPsBAgQIECAQCAhwgG6SAAECBAgIsB8gQIAAAQKBgAAH6CYJECBAgIAA+wECBAgQIBAICHCAbpIAAQIECAiwHyBAgAABAoGAAAfoJgkQIECAgAD7AQIECBAgEAgIcIBukgABAgQIHLFxAWmhEwHPAAAAAElFTkSuQmCC</pentrails><costumes><list struct="atomic" id="64"></list></costumes><sounds><list struct="atomic" id="65"></list></sounds><variables></variables><blocks></blocks><scripts><script x="294" y="77.30000000000001"><custom-block s="posicionar por defecto"></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje1"></custom-block><l>60</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje2"></custom-block><l>69</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje3"></custom-block><l>-40</l></custom-block><custom-block s="mover eje %s %s º"><custom-block s="eje4"></custom-block><l>360</l></custom-block></script></scripts><sprites select="0"></sprites></stage><variables></variables></scene></scenes></project>'
        this.importCustomBlocks()
        this.importProject(project)
        this.enableJS()
        this.generateText()

        if (this.options.blocks) {
            console.log("hay bloques");
            this.importCustomBlocks(this.options.blocks)
        }
        if (this.options.project) {
            console.log("hay proyecto");
            this.importProject(this.options.project)

        }

        if (this.remoteArm == true) {
            this.connectToSocketRoom();
        }
    }

    generateText() {
        var txt = new StringMorph(
            "<-------------123456789999999999--------->ewe",
            22,
            "sans-serif",
            false, // true
            false,
            false,
            null,
            null,
            "rgba(255, 255, 255)"
        );

        var nameField = new InputFieldMorph("aaqqq");
        nameField.setWidth(100); // fixed dimensions
        nameField.contrast = 90;

        var fun = () => {
            console.log("finallyyyy",snap);
        }

        var button = new PushButtonMorph(
            this,
            fun,
            "Conectarse a socket"
            //'\u2699'
        );
        // button.hasNeutralBackground = true;
        // button.corner = 12;
        // // button.color = colors[0];
        // // button.highlightColor = colors[1];
        // // button.pressColor = colors[0];
        // button.labelMinExtent = new Point(36, 18);
        // button.padding = 0;
        // button.labelShadowOffset = new Point(-1, -1);
        // // button.labelShadowColor = colors[1];
        // // button.labelColor = this.buttonLabelColor;
        // // button.contrast = this.buttonContrast;
        window.cb.add(button)
        
        
        // // window.txt2 = txt2
        window.cb.add(txt)
        window.cb.add(nameField)
        window.cb.children[3].setPosition(new Point(870,430))
        window.cb.children[1].setPosition(new Point(870,470))
        window.cb.children[2].setPosition(new Point(870,500))
    }

    enableJS() {
        Process.prototype.enableJS = true
    }
    
    importCustomBlocks(str) {
        var blocks;
        if (str) {
            blocks = str
        }  else {
            blocks = '<blocks app="Snap! 7, https://snap.berkeley.edu" version="2"><block-definition s="eje1" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>amarillo</l></block></script></block-definition><block-definition s="eje2" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rojo</l></block></script></block-definition><block-definition s="eje3" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>rosa</l></block></script></block-definition><block-definition s="eje4" type="reporter" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doReport"><l>naranja</l></block></script></block-definition><block-definition s="posicionar por defecto" type="command" category="motion"><header></header><code></code><translations></translations><inputs></inputs><script><block s="doRun"><block s="reportJSFunction"><list></list><l>snap.positionCylinders(0,0,0,0)</l></block><list></list></block></script></block-definition><block-definition s="posicionar ejes: %&apos;eje1&apos; %&apos;eje2&apos; %&apos;eje3&apos; %&apos;eje4&apos;" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%n"></input><input type="%n"></input><input type="%n"></input><input type="%n"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje1</l><l>eje2</l><l>eje3</l><l>eje4</l></list><l>snap.positionCylinders(eje1,eje2,eje3,eje4)</l></block><list><block var="eje1"/><block var="eje2"/><block var="eje3"/><block var="eje4"/></list></block></script></block-definition><block-definition s="mover eje %&apos;eje&apos; %&apos;grados&apos; º" type="command" category="motion"><header></header><code></code><translations></translations><inputs><input type="%s"></input><input type="%s"></input></inputs><script><block s="doRun"><block s="reportJSFunction"><list><l>eje</l><l>grados</l></list><l>snap.moveCylinder(eje,grados)</l></block><list><block var="eje"/><block var="grados"/></list></block></script></block-definition></blocks>'
        }
        window.this.openBlocksString(blocks,"Bloques robot",true)
    }

    importProject(str) {
        window.this.openProjectString(str)
    }

    positionCylinders(eje1, eje2, eje3, eje4) {
        console.log(`[snap] posiciono cilindros ${eje1} ${eje2} ${eje3} ${eje4}`);
        if (this.remoteArm) {
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
        if (this.remoteArm) {
            console.log("y a través de socket!");
            socket.emit('sendRotation', {"arm": color, "degrees": degrees});
        }
        arm.newRotation({"arm": color, "degrees": degrees})
    }

    connectToSocketRoom(roomId) {
        this.roomId = roomId
        socket.emit('joinRoom', roomId);
        this.remoteArm = true
    }

    disconnectFromSocketRoom(){
        socket.emit("leaveRoom")
        this.remoteArm = false
    }

    createRoom() {
        return "#"+(Math.random() + 1).toString(36).substring(6).toUpperCase();
    }

    updateArmRotation(armRotations) {
        if (this.remoteArm) {
            socket.emit("updateArmRotation", armRotations)
        }
    }
}
