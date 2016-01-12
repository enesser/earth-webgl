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
    var earth;


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

        earth = EarthWebGLDemo.earth();
        earth.isAddedToScene = false;


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
    for (var i = 0; i < 10000; i++) {
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

        if (earth.isLoaded && !earth.isAddedToScene) {
            scene.add(earth.meshGroup);
        }

        directionalLightColor.setStyle(settings.sunColor);
        directionalLight.color = directionalLightColor;

        ambientLightColor.setStyle(settings.ambientLight);
        ambientLight.color = ambientLightColor;

        if (settings) {
            camera.position.set(5.25, 0, 0);

            directionalLight.position.set(-1, 1, -10);
            directionalLight.intensity = settings.sunIntensity;

            if (earth.isLoaded) {

                atmosphereColor.setStyle(settings.atmosphereColor);

                earth.atmosphereMesh.visible = settings.atmosphereVisible;
                earth.atmosphereMaterial.color = atmosphereColor;
                earth.atmosphereMaterial.opacity = settings.atmosphereOpacity;
                earth.atmosphereMaterial.wireframe = settings.atmosphereWireframe;

                earth.cloudsMesh.visible = settings.cloudsVisible;
                earth.cloudsMaterial.opacity = settings.cloudsOpacity;
                earth.cloudsMaterial.wireframe = settings.cloudsWireframe;

                earth.terrainMesh.visible = settings.terrainVisible;
                earth.terrainMaterial.bumpScale = settings.terrainBumpScale;
                earth.terrainMaterial.wireframe = settings.terrainWireframe;

                if (settings.cloudsRotate) {
                    earth.cloudsMesh.rotation.y += settings.cloudsVelocity;
                }

                if (settings.terrainRotate) {
                    earth.terrainMesh.rotation.y += settings.terrainVelocity;
                }

                if (!earth.isAddedToScene) {
                    scene.add(earth.meshGroup);
                    earth.isAddedToScene = true;
                }
            }

        }

        camera.position.x += (mouseX - camera.position.x) * 0.005;
        camera.position.y += (-mouseY - camera.position.y) * 0.005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
};