// progress-bar.js
/*jshint esversion: 6 */

let ProgressBar = pc.createScript('progressBar');

// The entity that shows the fill image 
ProgressBar.attributes.add('progressImage', {type: 'entity'});
// The maximum width of the fill image
ProgressBar.attributes.add('progressImageMaxWidth', {type: 'number'});

ProgressBar.attributes.add('Speed', {type: 'number'});

ProgressBar.attributes.add('AI_Speed', {type: 'number'});

ProgressBar.prototype.initialize = function() {
    // initialize progress to 0
    this.setProgress(0);
    // if true the progress bar will increase 
    // otherwise it will decrease in update
    this.increase = true;  
    
    this.OneCounter = 0;
    this.gear = 1;
    this.tempGear = 0;
    this.tempGear2 = 0;
    
    this.shift = true;
    
    this.checkShift1 = false;
    this.checkShift2 = false;
    this.checkShift3 = false;
    this.checkShift4 = false;
    this.checkShift5 = false;
    
    this.carNormal = true;

    this.go = false;
    this.timer = 0;
    
    this.timer2 = 0;
    
    this.app.root.findByName('AI_Parent').rigidbody.angularVelocity = pc.Vec3.ZERO;
    this.app.root.findByName('AI_Parent').rigidbody.linearVelocity = pc.Vec3.ZERO;
    
    this.minusZ = new pc.Vec3(0,0,-this.AI_Speed);
    
    this.x = false;

};

// Set progress - value is between 0 and 1
ProgressBar.prototype.setProgress = function (value) {    
    // clamp value between 0 and 1
    value = pc.math.clamp(value, 0, 1);
    
    this.progress = value;
    
    // find the desired width of our progress fill image
    let width = pc.math.lerp(0, this.progressImageMaxWidth, value);
    // set the width of the fill image element
    this.progressImage.element.width = width;
    
    // Set the width of the element's rect (rect.z) to be the same
    // value as our 0-1 progress.
    // This is so that the fill image will only show the portion
    // of the texture that is visible
    this.progressImage.element.rect.z = value;
    // force rect update
    this.progressImage.element.rect = this.progressImage.element.rect;
    
};

ProgressBar.prototype.update = function(dt) {
    this.setProgress(this.OneCounter);
    this.run();
    this.drive();
    this.DQ();
    //this.upgrade();
    this.touchFunc();
    this.touchDrive();
    
    this.app.root.findByName("Gas").element.on('touchstart', function (event) {
        this.x = true;
    }, this);
    
    this.app.root.findByName("Gas").element.on('touchend', function (event) {
        this.x = false;
    }, this);
    
    let ready = this.app.root.findByName('Ready');
    let set = this.app.root.findByName('Set');
    let go = this.app.root.findByName('Go');
    let ai = this.app.root.findByName('AI_Parent');
    
    this.timer += dt;
    this.timer2 += dt;
    
    
    if (this.timer >= 2) {
        ready.enabled = false;
        set.enabled = true;
    }
    
    if (this.timer >= 5) {
        set.enabled = false;
        go.enabled = true;
        this.go = true;
    }
    
    if (this.timer >= 6) {
        go.enabled = false;
    }
    
    //AI
    
    if (this.go === true) {

        if (this.timer2 < 10) {
            ai.rigidbody.applyForce(this.minusZ);
        }
        
    }
    
};


ProgressBar.prototype.run = function(dt) {
    
    let gearText = this.app.root.findByName('Gear_Num');
    let early = this.app.root.findByName('Early');
    let late = this.app.root.findByName('Late');
    let perfect = this.app.root.findByName('Perfect');
    let gear1 = this.app.root.findByName('Gear1');
    let gear2 = this.app.root.findByName('Gear2');
    let gear3 = this.app.root.findByName('Gear3');
    let gear4 = this.app.root.findByName('Gear4');
    let gear5 = this.app.root.findByName('Gear5');
    
    
    if (this.checkFunc() === false) {
        if (this.gear === 1){ 

            if (this.shift === true) {
                gear1.element.on('click', function (event) {
                    if (this.checkShift1 === false) {

                        if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }

                        this.gear ++;

                        this.checkShift1 = true;

                        gear1.enabled = false;
                        gear2.enabled = true;
                    }
                }, this);

            }

            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.0369;
                }
            }

            else {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.0369;
                }
            }
        }

        if (this.gear === 2){ 

            gearText.element.text = this.gear.toString();


            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.015;
                }
            }

            if (this.app.keyboard.isPressed(pc.KEY_SPACE) === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.015;
                }
            }

            gear2.element.on('click', function (event) {
                if (this.checkShift3 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift3 = true;

                    gear2.enabled = false;
                    gear3.enabled = true;

                }
            }, this);

        }

        else if (this.gear === 3) {

            gearText.element.text = this.gear.toString();

            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.01;
                }
            }

            if (this.app.keyboard.isPressed(pc.KEY_SPACE) === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.01;
                }
            }

            gear3.element.on('click', function (event) {
                if (this.checkShift2 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift2 = true;

                    gear3.enabled = false;
                    gear4.enabled = true;

                }
            }, this);
        }

        else if (this.gear === 4) {
            gearText.element.text = this.gear.toString();

            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.003;
                }
            }

            if (this.app.keyboard.isPressed(pc.KEY_SPACE) === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.003;
                }
            }

            gear4.element.on('click', function (event) {
                if (this.checkShift4 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift4 = true;

                    gear4.enabled = false;
                    gear5.enabled = true;

                }
            }, this);

        }

        else if (this.gear === 5) {

            gearText.element.text = this.gear.toString();

            if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
                if (this.OneCounter < 0.8){
                    this.OneCounter += 0.0005;
                }
            }

            if (this.app.keyboard.isPressed(pc.KEY_SPACE) === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.0005;
                }
            }

        }
    }
    
};

ProgressBar.prototype.DQ = function(dt) {
    
    let car = this.app.root.findByName('Car_Parent');
    let ai = this.app.root.findByName('AI_Parent');
    
    if ((this.go === false && this.app.keyboard.isPressed(pc.KEY_SPACE)) || (this.go === false && this.x === true)) {
        car.rigidbody.linearVelocity = pc.Vec3.ZERO;
        car.rigidbody.angularVelocity = pc.Vec3.ZERO;
        ai.enabled = false;
        this.switchOffFunc();
        this.app.root.findByName('DQ').enabled = true;
    }
    
};

ProgressBar.prototype.drive = function(dt) {
    let car = this.app.root.findByName('Car_Parent');
    let fdForce = car.forward.clone();
    
    if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
        
        if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                        fdForce.scale(this.Speed);
                    }
                    
                    else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                        fdForce.scale((this.Speed) - 1);
                    }
                    
                    else if (this.OneCounter > 0.83 && this.OneCounter <= 1) {
                        fdForce.scale((this.Speed) - 2);
                    }
        
        car.rigidbody.applyForce(fdForce);
    }
};

ProgressBar.prototype.touchDrive = function(dt) {
    
    let car = this.app.root.findByName('Car_Parent');
    let fdForce = car.forward.clone();
    
    if (this.app.root.findByName("Gas").enabled === true) {
        if (this.x === true) {
            if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            fdForce.scale(this.Speed);
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            fdForce.scale((this.Speed) - 1);
                        }

                        else if (this.OneCounter > 0.83 && this.OneCounter <= 1) {
                            fdForce.scale((this.Speed) - 2);
                        }

            car.rigidbody.applyForce(fdForce);
        }
    }
};

ProgressBar.prototype.touchFunc = function(dt) {
    
    let gas = this.app.root.findByName("Gas");
    
    if (this.checkFunc() === true) {
        gas.enabled = true;
    }
    
    else {
        gas.enabled = false;
    }
    
    let gearText = this.app.root.findByName('Gear_Num');
    let early = this.app.root.findByName('Early');
    let late = this.app.root.findByName('Late');
    let perfect = this.app.root.findByName('Perfect');
    let gear1 = this.app.root.findByName('Gear1');
    let gear2 = this.app.root.findByName('Gear2');
    let gear3 = this.app.root.findByName('Gear3');
    let gear4 = this.app.root.findByName('Gear4');
    let gear5 = this.app.root.findByName('Gear5');
    
    if (gas.enabled === true) {
    
        if (this.gear === 1){ 

            if (this.shift === true) {
                gear1.element.on('click', function (event) {
                    if (this.checkShift1 === false) {

                        if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }

                        this.gear ++;

                        this.checkShift1 = true;

                        gear1.enabled = false;
                        gear2.enabled = true;
                    }
                }, this);

            }

            if (this.x === true) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.0369;
                }
            }

            else {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.0369;
                }
            }
        }

        if (this.gear === 2){ 

            gearText.element.text = this.gear.toString();


            if (this.x === true) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.015;
                }
            }

            if (this.x === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.015;
                }
            }

            gear2.element.on('click', function (event) {
                if (this.checkShift3 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift3 = true;

                    gear2.enabled = false;
                    gear3.enabled = true;

                }
            }, this);

        }

        else if (this.gear === 3) {

            gearText.element.text = this.gear.toString();

            if (this.x === true) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.01;
                }
            }

            if (this.x === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.01;
                }
            }

            gear3.element.on('click', function (event) {
                if (this.checkShift2 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift2 = true;

                    gear3.enabled = false;
                    gear4.enabled = true;

                }
            }, this);
        }

        else if (this.gear === 4) {
            gearText.element.text = this.gear.toString();

            if (this.x === true) {
                if (this.OneCounter < 1){
                    this.OneCounter += 0.003;
                }
            }

            if (this.x === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.003;
                }
            }

            gear4.element.on('click', function (event) {
                if (this.checkShift4 === false) {

                    if (this.OneCounter >= 0.69 && this.OneCounter <= 0.83) {
                            //alert('wjat');
                            perfect.enabled = true;
                            early.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter < 0.69 && this.OneCounter >= 0) {
                            early.enabled = true;
                            perfect.enabled = false;
                            late.enabled = false;
                        }

                        else if (this.OneCounter > 0.83) {
                            late.enabled = true;
                            early.enabled = false;
                            perfect.enabled = false;
                        }


                    this.gear ++;
                    this.checkShift4 = true;

                    gear4.enabled = false;
                    gear5.enabled = true;

                }
            }, this);

        }

        else if (this.gear === 5) {

            gearText.element.text = this.gear.toString();

            if (this.x === true) {
                if (this.OneCounter < 0.8){
                    this.OneCounter += 0.0005;
                }
            }

            if (this.x === false) {
                if (this.OneCounter > 0){
                    this.OneCounter -= 0.0005;
                }
            }

        }
    }
    
};

ProgressBar.prototype.switchOffFunc = function(dt) {
    this.app.root.findByName("Group").enabled = false;
    this.app.root.findByName("7000").enabled = false;
    this.app.root.findByName("Gas").enabled = false;
};

ProgressBar.prototype.checkFunc = function(dt) {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};


// finish.js
/* jshint esversion: 6*/

let Finish = pc.createScript('finish');

Finish.attributes.add('X', {type: 'number'});

Finish.attributes.add('Y', {type: 'number'});

// initialize code called once per entity
Finish.prototype.initialize = function() {
    this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    this.Entity1 = this.app.root.findByName('AI_Parent');
    this.Entity2 = this.app.root.findByName('finish');
    this.Entity3 = this.app.root.findByName('Car_Parent');
    this.checker = false;
    
    //this.x = 5;
};

Finish.prototype.onCollisionStart = function (result) {
    
    let x = this.X;
    let y = this.Y;
    
    //console.log(this.x);
    
    let win = this.app.root.findByName('Win');
    let lose = this.app.root.findByName('Lose');
    
    if (result.other == this.Entity1 && this.checker === false) {
        this.checker = false;
        
        this.Entity1.rigidbody.linearVelocity = pc.Vec3.ZERO;
        this.Entity2.rigidbody.linearVelocity = pc.Vec3.ZERO;
        
        this.Entity1.rigidbody.angularVelocity = pc.Vec3.ZERO;
        this.Entity2.rigidbody.angularVelocity = pc.Vec3.ZERO;
        
        lose.enabled = true;
        this.switchOffFunc();
        this.checker = true;
    }
    
    else if (result.other == this.Entity3 && this.checker === false) {
        this.checker = false;
        win.enabled = true;
        this.switchOffFunc();
        this.checker = true;
        
    }

};

Finish.prototype.switchOffFunc = function(dt) {
    this.app.root.findByName("Group").enabled = false;
    this.app.root.findByName("7000").enabled = false;
    this.app.root.findByName("Gas").enabled = false;
};

// swap method called for script hot-reloading
// inherit your script state here
// Finish.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

var BtnStates=pc.createScript("btnStates");BtnStates.attributes.add("hoverAsset",{type:"asset",assetType:"texture"}),BtnStates.attributes.add("activeAsset",{type:"asset",assetType:"texture"}),BtnStates.prototype.initialize=function(){this.originalTexture=this.entity.element.textureAsset,this.hovered=!1,this.entity.element.on("mouseenter",this.onEnter,this),this.entity.element.on("mousedown",this.onPress,this),this.entity.element.on("mouseup",this.onRelease,this),this.entity.element.on("mouseleave",this.onLeave,this),this.entity.element.on("touchstart",this.onPress,this),this.entity.element.on("touchend",this.onRelease,this)},BtnStates.prototype.onEnter=function(t){this.hovered=!0,t.element.textureAsset=this.hoverAsset,document.body.style.cursor="pointer"},BtnStates.prototype.onLeave=function(t){this.hovered=!1,t.element.textureAsset=this.originalTexture,document.body.style.cursor="default"},BtnStates.prototype.onPress=function(t){t.element.textureAsset=this.activeAsset},BtnStates.prototype.onRelease=function(t){t.element.textureAsset=this.hovered?this.hoverAsset:this.originalTexture};var Cities=pc.createScript("cities");Cities.attributes.add("sceneId1",{type:"string",default:"0",title:"1"}),Cities.attributes.add("sceneId2",{type:"string",default:"0",title:"2"}),Cities.attributes.add("sceneId3",{type:"string",default:"0",title:"3"}),Cities.prototype.initialize=function(){this.check1=!1,this.check2=!1,this.check3=!1},Cities.prototype.update=function(t){var e=this.app.root.findByName("btn1"),i=this.app.root.findByName("2"),c=this.app.root.findByName("3");e.element.on("click",function(t){!1===this.check1&&(this.changeScenes(this.sceneId1),this.check1=!0)},this),i.element.on("click",function(t){!1===this.check2&&(this.changeScenes(this.sceneId2),this.check2=!0)},this),c.element.on("click",function(t){!1===this.check3&&(this.changeScenes(this.sceneId3),this.check3=!0)},this)},Cities.prototype.changeScenes=function(t){var e=this.app.root.findByName("Root");this.loadScene(t,function(){e.destroy()})},Cities.prototype.loadScene=function(t,e){var i=t+".json";this.app.loadSceneHierarchy(i,function(t,i){t?console.error(t):e(i)})};var NotSpecified=pc.createScript("notSpecified");NotSpecified.prototype.initialize=function(){},NotSpecified.prototype.update=function(i){};var WheelRotation=pc.createScript("wheelRotation");WheelRotation.prototype.initialize=function(){},WheelRotation.prototype.update=function(t){this.app.keyboard.isPressed(pc.KEY_SPACE)&&this.entity.rotateLocal(-20,0,0)};var ChangeSs=pc.createScript("changeSs");ChangeSs.attributes.add("sceneId",{type:"string",default:"0",title:"Scene ID to Load"}),ChangeSs.prototype.initialize=function(){this.check=!1},ChangeSs.prototype.update=function(e){this.app.root.findByName("Ty").element.on("click",function(e){!1===this.check&&(this.changeScenes(),this.check=!0)},this)},ChangeSs.prototype.changeScenes=function(){var e=this.app.root.findByName("Root");this.loadScene(this.sceneId,function(){e.destroy()})},ChangeSs.prototype.loadScene=function(e,t){var n=e+".json";this.app.loadSceneHierarchy(n,function(e,n){e?console.error(e):t(n)})};var Hq=pc.createScript("hq");Hq.attributes.add("sceneId",{type:"string",default:"0",title:"Scene ID to Load"}),Hq.prototype.initialize=function(){this.check=!1},Hq.prototype.update=function(t){this.entity.element.on("click",function(t){!1===this.check&&(this.changeScenes(),this.check=!0)},this)},Hq.prototype.changeScenes=function(){var t=this.app.root.findByName("Root");this.loadScene(this.sceneId,function(){t.destroy()})},Hq.prototype.loadScene=function(t,e){var n=t+".json";this.app.loadSceneHierarchy(n,function(t,n){t?console.error(t):e(n)})};var Mute=pc.createScript("mute");Mute.prototype.initialize=function(){this.check=!1},Mute.prototype.update=function(t){this.entity.element.on("click",function(t){0!==this.app.systems.sound.volume?(this.app.systems.sound.volume=0,this.check=!0):(this.app.systems.sound.volume=1,this.check=!1)},this)};var Retry=pc.createScript("retry");Retry.prototype.initialize=function(){this.check=!1},Retry.prototype.update=function(t){this.entity.element.on("click",function(t){!1===this.check&&(window.location.reload(),this.check=!0)},this)};