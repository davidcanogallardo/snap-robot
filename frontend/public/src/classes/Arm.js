class Arm {
    constructor(armWithSnap) {
        this.scene
        this.camera
        this.renderer
        this.rotationQueue = []
        this.rotationQueue2 = []
        this.armWithSnap = armWithSnap
        this.isRendered = false
        this.init()
    }

    init() {
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
       
        // point light
        var pl = new THREE.PointLight(0xffffff);
        pl.position.set(30, 60, 40);
      
        const sphereSize = 1;
        // const pointLightHelper = new THREE.PointLightHelper(pl, sphereSize, 0x000000);
        
        // scene
        var scene = new THREE.Scene();
        window.scene = scene
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
        // scene.add(axes);
      
        // render
        var renderer = new THREE.WebGLRenderer({canvas:armCanvas});
        if (this.armWithSnap) {
            renderer.setSize( 
                window.world.children[0].children[2].width() - 30, 
                window.world.children[0].children[2].height() 
            );
        } else {
            renderer.setSize( 
                window.innerWidth, 
                window.innerHeight
            );
        }
        window.renderer = renderer
        container.appendChild( renderer.domElement );
        // controls
        //var controls = new OrbitControls(camera, renderer.domElement);
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(look_x, look_y, look_z);
        controls.update();
        // var controls = new THREE.OrbitControls(camera, renderer.domElement);
      
        // app loop
        var loop =  () => {
            // console.log(this.getStage);
            if (this.armWithSnap) {
                renderer.setSize( 
                    this.getStage().width(),
                    this.getStage().height()
                );
            } else {
                renderer.setSize( 
                    window.innerWidth, 
                    window.innerHeight
                );
            }

            if (window.innerWidth < 990 ) {
                camera.scale.x = 0.5
            } else {
                camera.scale.x = 0.7

            }

            requestAnimationFrame(loop);
            renderer.render(scene, camera);
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
          this.isRendered = true
          if (this.armRotations) {
              this.setArmRotationFromRoom(this.armRotations)
          }

          loop();
        });
    }

    getStage() {
        var length = window.world.children[0].children.length
        var snapComponents = window.world.children[0].children
        for (let i = 0; i < length; i++) {
            if (snapComponents[i].name=="Stage") {
                return snapComponents[i]       
            }
        }
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

    getArmRotations() {
        return {
            amarillo: this.all.rotation, 
            rojo: this.redPivot.rotation, 
            rosa: this.pinkPivot.rotation, 
            naranja: this.pivotGroup.rotation, 
        }
    }

    newRotation(data, cb) {
        if (this.rotationQueue.length > 0) {
            this.rotationQueue[this.rotationQueue.length] = {"rotation": data, "callback": cb}
        } else {
            this.rotationQueue[this.rotationQueue.length] = {"rotation": data, "callback": cb}
            this.startRotation({"rotation": data, "callback": cb})
        }
    }

    startRotation(data) {
        this.nLoops = Math.abs(data.rotation.degrees)
        this.currentLoop = 1
        // Math.sign devuelve -1 si le pasa un número negativo o 1 si le pasas uno positivo
        this.degrees = Math.sign(data.rotation.degrees)
        console.log("start rotation");
        this.canRotate = true
        this.rotationLoop(data.callback, data.rotation.arm)
    }

    rotationLoop(callback, armToRotate) {  
        if (this.canRotate) {
            setTimeout(() => {  
                this.rotateArm(armToRotate, this.degrees)
                this.currentLoop++;       
                this.rotationQueue[0].degrees--;
                if (this.currentLoop < this.nLoops) {  
                    this.rotationLoop(callback, armToRotate);             
                } else {
                    if (callback) {
                        callback(this.getArmRotations())
                    }
    
                    this.rotationQueue.shift()
                    if (this.rotationQueue.length > 0) {
                        this.startRotation(this.rotationQueue[0])
                    }
                    console.log("termino");
                }                  
            }, 1)
            
        }
    }

    stopQueue() {
        this.canRotate = false
        this.rotationQueue = []
        if (false) {
            console.log("arm stop");
            socket.emit("stopQueue")
            // TODO emit
        }
    }

    togglePauseResume() {
        console.log("toggle pause resume");
        if (this.canRotate) {
            this.canRotate = false
        } else {
            this.canRotate = true
            if (this.rotationQueue.length > 0) {
                this.startRotation(this.rotationQueue[0])
            }
        }
        if (false) {
            // TODO emit
        }
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

    setArmRotation(data, callback) {
        console.log(data);
        switch (data.arm) {
            case "amarillo":
                this.all.rotation.set(0, THREE.Math.degToRad(data.degrees), 0);
                break;
            case "rojo":
                this.redPivot.rotation.set(0, 0, THREE.Math.degToRad(data.degrees));
                break;
            case "rosa":
                this.pinkPivot.rotation.set(0, 0, THREE.Math.degToRad(data.degrees));
                break;
            case "naranja":
                this.pivotGroup.rotation.set(0, 0, THREE.Math.degToRad(data.degrees));
                break;
        }
        if (callback) {
            callback({
                "positions": this.getArmRotations()
            })
        }
    }

    setArmRotations(data) {
        this.armRotations = data
    }

    setArmRotationFromRoom(data) {
        this.all.rotation.set(data.amarillo._x, data.amarillo._y, data.amarillo._z);
        this.redPivot.rotation.set(data.rojo._x, data.rojo._y, data.rojo._z);
        this.pinkPivot.rotation.set(data.rosa._x, data.rosa._y, data.rosa._z);
        this.pivotGroup.rotation.set(data.naranja._x, data.naranja._y, data.naranja._z);
    }
}