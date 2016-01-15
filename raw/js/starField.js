'use strict';

/* global THREE: true */

var EarthWebGLDemo = EarthWebGLDemo || {};

/**
 * Get an instance of the stars field object
 * @return {object} stars
 */
EarthWebGLDemo.starField = function() {

    let starFieldObject = {

        /**
         * Represents the stars in the field
         * @type {[type]}
         */
        stars: null
    };

    let starGeometry = new THREE.Geometry();

    for (let i = 0; i < 10000; i++) {
        starGeometry.vertices.push(new THREE.Vector3(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        ));
    }

    let starMaterial = new THREE.PointsMaterial();

    starMaterial.sizeAttenuation = false;
    starFieldObject.stars = new THREE.Points(starGeometry, starMaterial);

    return starFieldObject;
};