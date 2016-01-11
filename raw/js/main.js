'use strict';

/* global window, console, THREE: true */

((window) => {
    //window.onload = ()=> {
      //  console.log('test...');

    //};
})();



window.onload = () => {

let settings = EarthWebGLDemo.settings();

var container;

var camera, scene, renderer;

var mouseX = 0,
mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var obj = null;


init();
animate();

var directionalLight;
var directionalLightColor;
var ambientLightColor;
var ambientLight; 
var atmosphereColor;


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);


                // scene

                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                //camera.position.z = 100;


                //var ambient = new THREE.AmbientLight(0x444444);
                ambientLightColor = new THREE.Color();
                ambientLight = new THREE.AmbientLight(ambientLightColor);
                //var ambient = new THREE.AmbientLight(0xFFFFFF);
                scene.add(ambientLight);

                directionalLightColor = new THREE.Color();
                directionalLight = new THREE.DirectionalLight(directionalLightColor);
                directionalLight.castShadow = true;
                //directionalLight.position.set(-200, 10, 10).normalize();
                scene.add(directionalLight);

                atmosphereColor = new THREE.Color();

                // model

                var onProgress = function(xhr) {
                    if (xhr.lengthComputable) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentComplete, 2) + '% downloaded');
                    }
                };

                var onError = function(xhr) {};

                const pathEarthModelLow = 'models/earth/low/earth.obj';
                const pathEarthModelHigh = 'models/earth/high/earth.obj';
                const pathEarthModelMaterialLow = 'models/earth/low/earth.mtl';
                const pathEarthModelMaterialHigh = 'models/earth/high/earth.mtl';

                let earthPath = '';
                let earthMaterialPath = '';


                function getQueryVariable(variable) {
                    var query = window.location.search.substring(1);
                    var vars = query.split('&');
                    for (var i = 0; i < vars.length; i++) {
                        var pair = vars[i].split('=');
                        if (decodeURIComponent(pair[0]) == variable) {
                            return decodeURIComponent(pair[1]);
                        }
                    }
                }


                let quality = getQueryVariable('quality') === 'low' ? 'low' : 'high';

                if (quality === 'low') {
                    earthPath = pathEarthModelLow;
                    earthMaterialPath = pathEarthModelMaterialLow;
                } else {
                    earthPath = pathEarthModelHigh;
                    earthMaterialPath = pathEarthModelMaterialHigh;
                }

                var loader = new THREE.OBJMTLLoader();
                loader.load(earthPath, earthMaterialPath, function(object) {

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


        var stars = new THREE.Geometry();
    for (var i=0; i<10000; i++) {
      stars.vertices.push(new THREE.Vector3(
        //1e3 * Math.random() - 5e2,
        //1e3 * Math.random() - 5e2,
        //-1e2
        //1e3 * Math.random() - 5e2,
        //1e3 * Math.random() - 5e2,
        //-1e2
        //
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000,
        Math.random() * 2000 - 1000
      ));
    }

    var star_stuff = new THREE.PointsMaterial();
    star_stuff.sizeAttenuation = false;
    var star_system = new THREE.Points(stars, star_stuff);
    scene.add(star_system);

            function onDocumentMouseMove(event) {

                if (event.buttons) {
                mouseX = (event.clientX - windowHalfX) / 2;
                mouseY = (event.clientY - windowHalfY) / 2;
            }


            }

             //

             function animate() {

                requestAnimationFrame(animate);
                render();

            }

            function render() {

                directionalLightColor.setStyle(settings.sunColor);
                directionalLight.color = directionalLightColor;

                ambientLightColor.setStyle(settings.ambientLight);
                ambientLight.color = ambientLightColor;

                if (settings) {
                camera.position.set(5.25, 0, 0);

                directionalLight.position.set(-1, 1, -10);
                directionalLight.intensity = settings.sunIntensity;

                if (obj) {
            }
            }

                    camera.position.x += ( mouseX - camera.position.x ) * 0.005;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.005;
        camera.lookAt( scene.position );


                if (obj) {

                    //obj.position.set(0, 0, -100);

                    //obj.position.x = 0;
                    //obj.position.y = 0;
                    //obj.position.z = 0;
                    //
                    //

                    atmosphereColor.setStyle(settings.atmosphereColor);
                    obj.children[0].visible = settings.atmosphereVisible;
                    obj.children[0].children[1].material.color = atmosphereColor; 
                    obj.children[0].children[1].material.wireframe = settings.atmosphereWireframe;


                    obj.children[0].children[1].material.opacity = settings.atmosphereOpacity;
                    obj.children[0].children[1].material.depthWrite = false; //fix atmospehre
                    obj.children[1].children[1].material.opacity = settings.cloudsOpacity; //fix clouds
                    //obj.children[1].children[1].material.opacity = 1; //fix clouds
                    obj.children[1].children[1].material.blending = THREE.AdditiveBlending;

                    obj.children[1].children[1].material.wireframe = settings.cloudsWireframe;

                    obj.children[1].children[1].material.visible = settings.cloudsVisible;


                    obj.children[1].children[1].material.shininess = 0; //fix clouds
                    obj.children[2].children[1].material.shininess = 0; //fix clouds
                    obj.children[0].children[1].material.shininess = 0; //fix clouds


                    obj.children[1].children[0].material.shininess = 0; //fix clouds
                    obj.children[2].children[0].material.shininess = 0; //fix clouds
                    obj.children[0].children[0].material.shininess = 0; //fix clouds



                    obj.children[1].castShadow = true;
                    obj.children[2].receiveShadow = true;
                    obj.children[2].visible = settings.terrainVisible;
                    obj.children[2].children[1].material.bumpScale = settings.terrainBumpScale;
                    obj.children[2].children[1].material.wireframe = settings.terrainWireframe;

                    //obj.children[0].visible = false;
                    //
                    if (settings.cloudsRotate) {
                        obj.children[1].rotation.y += settings.cloudsVelocity;
                    }

                    if (settings.terrainRotate) {
                        obj.children[2].rotation.y += settings.terrainVelocity;
                    }
                }


                if (obj) {
                    //camera.lookAt(obj.position);
                }

                renderer.render(scene, camera);


            }


        };