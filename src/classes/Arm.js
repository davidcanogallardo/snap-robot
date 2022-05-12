class Arm {
    constructor() {
        this.scene
        this.camera
        this.renderer
        this.rotationQueue = []
        this.init2()
    }

    init2() {
        var recursive_robot_print = function (object_group, componentsArray) {
            object_group.children.forEach(function (item) {
                var temp_componentsArray = [];
                // if(item.type=="Group"  ){
                if (item.type == "Group" && !item.name.includes("ur10")) {
                // console.log(item);
                // console.log( item.type + " - [" +item.name+"]");
                // console.log(componentsArray);
    
                componentsArray[item.name] = item;
                temp_componentsArray = recursive_robot_print(item, componentsArray);
                }
                componentsArray = Object.assign({}, componentsArray, temp_componentsArray);
            });
            return componentsArray;
        }
        var armCanvas = document.getElementById("arm")
        var container = document.getElementById("container")
        let look_x = 0;
        let look_y = 35;
        let look_z = 0;
        var options = {
          amarillo: 0,
          rojo: 0,
          rosa: 0,
          naranja: 0,
          verde: 0,
        };
        var gui = new dat.GUI();
        gui.add(options, 'amarillo', 0, 7).listen();
        gui.add(options, 'rojo', 0, 7).listen();
        gui.add(options, 'rosa', 0, 7).listen();
        gui.add(options, 'naranja', 0, 7).listen();
        gui.add(options, 'verde', 0, 7).listen();
       
        // point light
        var pl = new THREE.PointLight(0xffffff);
        pl.position.set(30, 60, 40);
      
        const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper(pl, sphereSize, 0x000000);
        
        // scene
        var scene = new THREE.Scene();
        scene.background = new THREE.Color("white");
        scene.add(pl);
        // scene.add(pointLightHelper);
      
        // camera
        var camera = new THREE.PerspectiveCamera(35, 840 / 680, 0.1, 500);
        camera.position.set(3, 0.5, 3);
        camera.position.set(1.5, 3, 5);
        camera.position.set(50, 100, 135);
        //camera.add(pl);
        camera.lookAt(look_x, look_y, look_z);
        scene.add(camera);
        window.camera = camera;
      
        //AXES HELPER
        var axes = new THREE.AxisHelper(25);
        scene.add(axes);
      
        // render
        var renderer = new THREE.WebGLRenderer({canvas:armCanvas});
        renderer.setSize( 500, 700 );
        container.appendChild( renderer.domElement );
        // controls
        //var controls = new OrbitControls(camera, renderer.domElement);
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(look_x, look_y, look_z);
        controls.update();
        // var controls = new THREE.OrbitControls(camera, renderer.domElement);
      
        // app loop
        var loop = function () {
          // camera.lookAt(look_x, look_y, look_z);
          controls.update()
        //   window.base.rotation.y = options.amarillo
        //   window.p1.rotation.z = options.rojo
        //   window.p2.rotation.z = options.rosa
        //   window.p3.rotation.z = options.naranja
        //   window.p4.rotation.y = options.verde
      
      
          requestAnimationFrame(loop);
          renderer.render(scene, camera);
        //   controls.update();
        };
      
        // CREATE A COLLADALOADER INSTANCE
        var loader = new  THREE.ColladaLoader();
        loader.load("./src/arm-3d-model/ur10_2.dae",  (result) => {
          let componentsArray = []
          componentsArray = recursive_robot_print(result.scene, componentsArray)
          window.ca = componentsArray
          scene.add(componentsArray.ArmBase)
          scene.add(componentsArray.ArmBase2)
          let pivot1 = this.setPivot(componentsArray.ArmBase2, componentsArray.ArmBase3)
          pivot1.position.y += 5
          componentsArray.ArmBase3.position.y -= 5
          let pivot2 = this.setPivot(componentsArray.ArmBase3, componentsArray.ArmBase4)
          pivot2.position.y += 29
          componentsArray.ArmBase4.position.y -= 29
          let pivot3 = this.setPivot(componentsArray.ArmBase4, componentsArray.ArmBase5)
          pivot3.position.y += 52
          componentsArray.ArmBase5.position.y -= 52
          let pivot4 = this.setPivot(componentsArray.ArmBase5, componentsArray.SubArm5)
          pivot4.position.y += 57
          componentsArray.SubArm5.position.y -= 57
          pivot4.position.z -= 6.5  
          componentsArray.SubArm5.position.z += 6.5
      
          window.base = componentsArray.ArmBase2
          window.p1 = pivot1
          window.p2 = pivot2
          window.p3 = pivot3
          window.p4 = pivot4

          this.all = componentsArray.ArmBase2
          this.redPivot = pivot1
          this.pinkPivot = pivot2
          this.pivotGroup = pivot3
          loop();
        });
    }

    //Funcion que setea un pivot entre dos componentes del robot. Devuelve el pivot
    setPivot(item1, item2) {
        //  PARA VER LOS EJES DE LOS PIVOTES
        //let axes = new THREE.AxisHelper(105) 
        let pivot = new THREE.Object3D()
        //pivot.add(axes)
        item1.add(pivot)
        pivot.add(item2)
        return pivot
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
        // 
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
                this.redPivot.rotateZ(THREE.Math.degToRad(degrees))
                break;
            case "amarillo":
                this.all.rotateY(THREE.Math.degToRad(degrees))
                break;
            case "rosa":
                this.pinkPivot.rotateZ(THREE.Math.degToRad(degrees))
                break;
            case "naranja":
                this.pivotGroup.rotateZ(THREE.Math.degToRad(degrees))
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