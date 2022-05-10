class Arm {
    constructor() {
        this.scene
        this.camera
        this.renderer
        this.rotationQueue = []
        this.init()
    }

    init() {
        var armCanvas = document.getElementById("arm")
        var container = document.getElementById("container")
        //var gui = new dat.GUI();
        // gui.add(options, 'amarillo', 0, 1).listen();
        // gui.add(options, 'rojo', 0, 1).listen();
        // gui.add(options, 'rosa', 0, 1).listen();
        // gui.add(options, 'naranja', 0, 1).listen();
        // escena y cámara
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera( 100, 500 / 700, 0.1, 1000 );
        this.camera.position.x = 0.2;
        this.camera.position.y = 7.7;
        this.camera.position.z = 24;
        // camera.lookAt(new THREE.Vector3(0, 0, 0));
        
        this.renderer = new THREE.WebGLRenderer({canvas:armCanvas});
        this.renderer.setSize( 500, 700 );
        container.appendChild( this.renderer.domElement );
    
        // camara que gira con el click del raton
        var controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
        controls.target.set( 0, 0, 0 );
    
        // cube 1
        const geometry = new THREE.CylinderGeometry(2,2,7,9);
        const material = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe:true, wireframeLinewidth:10} );
        const yellow = new THREE.Mesh( geometry, material );
    
        // cube 2
        const geometry2 = new THREE.CylinderGeometry(2,2,5,9);
        const material2 = new THREE.MeshBasicMaterial( {color: 0xf11f00, wireframe:true, wireframeLinewidth:10} );
        const red1 = new THREE.Mesh( geometry2, material2 );
    
        red1.position.y = yellow.position.y+0.5
        red1.position.x = yellow.position.x+5
        red1.rotation.z = 1.6
        
        // cube 3
        const geometry3 = new THREE.CylinderGeometry(2,2,11,9);
        const material3 = new THREE.MeshBasicMaterial( {color: 0xf11f00, wireframe:true, wireframeLinewidth:10} );
        const red2 = new THREE.Mesh( geometry3, material3 );
        
        red2.position.y = red1.position.y+5
        red2.position.x = red1.position.x+3.5
    
        // cube 2 2
        const geometry4 = new THREE.CylinderGeometry(2,2,5,9);
        const material4 = new THREE.MeshBasicMaterial( {color: 0xf116b1, wireframe:true, wireframeLinewidth:10} );
        const pink1 = new THREE.Mesh( geometry4, material4 );
    
        pink1.position.y = red2.position.y+4.2
        pink1.position.x = red2.position.x-3
        pink1.rotation.z = 1.6
        // red2.rotation.x = 1.6
    
        // cube 3 2
        const geometry5 = new THREE.CylinderGeometry(2,2,11,9);
        const material5 = new THREE.MeshBasicMaterial( {color: 0xf116b1, wireframe:true, wireframeLinewidth:10} );
        const pink2 = new THREE.Mesh( geometry5, material5 );
        
        pink2.position.y = pink1.position.y+5
        pink2.position.x = pink1.position.x-3
    
       // cube 2 3
       const geometry6 = new THREE.CylinderGeometry(2,2,5,9);
        const material6 = new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe:true, wireframeLinewidth:10} );
        const orange1 = new THREE.Mesh( geometry6, material6 );
    
        orange1.position.y = pink2.position.y-5
        orange1.position.x = pink2.position.x+1
        orange1.rotation.z = 1.6
        
        // cube 3 3
        const geometry7 = new THREE.CylinderGeometry(2,2,6,9);
        const material7 = new THREE.MeshBasicMaterial( {color: 0xffa500, wireframe:true, wireframeLinewidth:10} );
        const orange2 = new THREE.Mesh( geometry7, material7 );
        
        orange2.position.y = orange1.position.y+1.5
        orange2.position.x = orange1.position.x+3.5
        // scene.add(yellow,red,pink,red2,pink2, red3,pink3);
        // window.cube = yellow
    
        var orangeGroup = new THREE.Group();
        orangeGroup.position.y =orange1.position.y-20
        orangeGroup.add(orange2)
        orangeGroup.add(orange1)
        
        var pivotGroup = new THREE.Object3D();
        pivotGroup.position.y = orange1.position.y+9
        pivotGroup.position.x = orange1.position.x
        pivotGroup.add( orangeGroup );
    
        var pinkGroup = new THREE.Group();
        pinkGroup.position.y = pink1.position.y-20
        pinkGroup.position.x = pink1.position.x-12
        pinkGroup.add(pink2)
        pinkGroup.add(pink1)
        pinkGroup.add(pivotGroup)
       
        var pinkPivot = new THREE.Object3D();
        pinkPivot.position.y = pink1.position.y
        pinkPivot.position.x = pink1.position.x
        pinkPivot.add( pinkGroup );
    
        var redGroup = new THREE.Group();
        redGroup.position.y = yellow.position.y
        redGroup.position.x = yellow.position.x-5
        redGroup.add(red2)
        redGroup.add(red1)
        redGroup.add(pinkPivot)
       
        var redPivot = new THREE.Object3D();
        redPivot.position.y = red1.position.y+1
        redPivot.position.x = red1.position.x-0.5
        redPivot.add( redGroup );
    
        var all =  new THREE.Group();
    
        all.add(yellow)
        all.add(redPivot)
        window.yellow = all
       
        this.scene.add(all);
    
        window.camera = this.camera
        window.rotate = function (angle) {
            all.rotateY(THREE.Math.degToRad(angle))
        }
        
        window.renderer = this.renderer
        window.camera = this.camera
        window.scene = this.scene
        this.all = all
        this.pivotGroup = pivotGroup
        this.pinkPivot = pinkPivot
        this.redPivot = redPivot
        animate();
    }

    getArmPositions() {
        return {
            amarillo: this.all.rotation, 
            rojo: this.redPivot.rotation, 
            rosa: this.pinkPivot.rotation, 
            naranja: this.pivotGroup.rotation, 
        }
    }

    newRotation(data) {
        if (this.rotationQueue.length > 0) {
            this.rotationQueue[this.rotationQueue.length] = data
        } else {
            this.rotationQueue[this.rotationQueue.length] = data
            this.startRotation(data)
        }
    }

    startRotation(data) {
        this.nLoops = Math.abs(data.degrees)
        this.currentLoop = 1
        // Math.sign devuelve -1 si le pasa un número negativo o 1 si le pasas uno positivo
        this.degrees = Math.sign(data.degrees)
        this.myLoop(null, data.arm)
    }

    myLoop(callback, armToRotate) {  
        setTimeout(() => {  
            this.rotateArm(armToRotate, this.degrees)
            this.currentLoop++;          
            if (this.currentLoop < this.nLoops) {  
                this.myLoop(callback, armToRotate);             
            } else {
                snap.updateArmRotation(this.getArmPositions())
                this.rotationQueue.shift()
                if (this.rotationQueue.length > 0) {
                    this.startRotation(this.rotationQueue[0])
                }
                console.log("termino");
            }                  
        }, 1)
    }
    
    rotateArm(arm, degrees) {
        switch (arm) {
            case "rojo":
                this.redPivot.rotateX(THREE.Math.degToRad(degrees))
                break;
            case "amarillo":
                this.all.rotateY(THREE.Math.degToRad(degrees))
                break;
            case "rosa":
                this.pinkPivot.rotateX(THREE.Math.degToRad(degrees))
                break;
            case "naranja":
                this.pivotGroup.rotateX(THREE.Math.degToRad(degrees))
                break;
        }
    }

    positionArm(data) {
        switch (data.arm) {
            case "amarillo":
                this.all.rotation.set(0, THREE.Math.degToRad(data.degrees), 0);
                break;
            case "rojo":
                this.redPivot.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
                break;
            case "rosa":
                this.pinkPivot.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
                break;
            case "naranja":
                this.pivotGroup.rotation.set(THREE.Math.degToRad(data.degrees), 0, 0);
                break;
        }
        snap.updateArmRotation(this.getArmPositions)
    }

    initialPos(data) {
        this.all.rotation.set(data.amarillo._x, data.amarillo._y, data.amarillo._z);
        this.redPivot.rotation.set(data.rojo._x, data.rojo._y, data.rojo._z);
        this.pinkPivot.rotation.set(data.rosa._x, data.rosa._y, data.rosa._z);
        this.pivotGroup.rotation.set(data.naranja._x, data.naranja._y, data.naranja._z);
    }
}