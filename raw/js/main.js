'use strict';

var container, stats;

var camera, scene, renderer;

var mouseX = 0,
mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var obj = null;


init();
animate();

var Settings = function() {
  this.cameraX = 6;
  this.cameraY = 0;
  this.cameraZ = 0;
  this.lightX = -1;
  this.lightY = 1;
  this.lightZ = -10;
  this.lightIntensity = 4.0;
};

var settings = new Settings();

window.onload = function() {
  var gui = new dat.GUI();
  gui.add(settings, 'cameraX');
  gui.add(settings, 'cameraY');
  gui.add(settings, 'cameraZ');
  gui.add(settings, 'lightX');
  gui.add(settings, 'lightY');
  gui.add(settings, 'lightZ');
  gui.add(settings, 'lightIntensity');
};

var directionalLight;


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);


                // scene

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
                //camera.position.z = 100;


                //var ambient = new THREE.AmbientLight(0x444444);
                var ambient = new THREE.AmbientLight(0x555555);
                //var ambient = new THREE.AmbientLight(0xFFFFFF);
                scene.add(ambient);

                directionalLight = new THREE.DirectionalLight(0xffeedd);
                directionalLight.castShadow = true;
                //directionalLight.position.set(-200, 10, 10).normalize();
                scene.add(directionalLight);

                // model

                var onProgress = function(xhr) {
                    if (xhr.lengthComputable) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentComplete, 2) + '% downloaded');
                    }
                };

                var onError = function(xhr) {};


                var loader = new THREE.OBJMTLLoader();
                loader.load('models/earth/earth.obj', 'models/earth/earth.mtl', function(object) {

                    console.dir(object);
                    obj = object;
                    //obj.scale.x += 70;
                    //obj.scale.y += 70;
                    //obj.scale.z += 70;
                    //object.position.y = -80;
                    scene.add(object);

                }, onProgress, onError);

                //

                renderer = new THREE.WebGLRenderer({
                    alpha: true,
                    antialias: true
                });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                container.appendChild(renderer.domElement);

                document.addEventListener('mousemove', onDocumentMouseMove, false);

                //

                window.addEventListener('resize', onWindowResize, false);

            }

            function onWindowResize() {

                windowHalfX = window.innerWidth / 2;
                windowHalfY = window.innerHeight / 2;

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize(window.innerWidth, window.innerHeight);

            }

            function onDocumentMouseMove(event) {

                mouseX = (event.clientX - windowHalfX) / 2;
                mouseY = (event.clientY - windowHalfY) / 2;

            }

             //

             function animate() {

                requestAnimationFrame(animate);
                render();

            }

            var rotation = 0;

            function render() {

                if (settings) {
                camera.position.set(settings.cameraX, settings.cameraY, settings.cameraZ);


                directionalLight.position.set(settings.lightX, settings.lightY, settings.lightZ);
                directionalLight.intensity = settings.lightIntensity;

                if (obj) {
            }
            }


                if (obj) {

                    obj.position.set(0, 0, -100);

                    obj.position.x = 0;
                    obj.position.y = 0;
                    obj.position.z = 0;


                    obj.children[0].children[1].material.opacity = 0.3;
                    obj.children[0].children[1].material.depthWrite = false; //fix atmospehre
                    obj.children[1].children[1].material.opacity = 0.6; //fix clouds
                    obj.children[1].children[1].material.blending = THREE.AdditiveBlending;
                    obj.children[1].children[1].material.shininess = 0; //fix clouds
                    obj.children[1].castShadow = true;
                    obj.children[2].receiveShadow = true;
                    obj.children[2].children[1].material.bumpScale = 0.1;


                    //obj.children[0].visible = false;
                    obj.children[1].rotation.y += 0.002;
                    obj.children[2].rotation.y += 0.001;
                }


                if (obj) {
                    camera.lookAt(obj.position);
                }

                renderer.render(scene, camera);


            }