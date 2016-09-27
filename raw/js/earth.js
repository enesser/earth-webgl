'use strict';

/* global console, THREE: true */

var EarthWebGLDemo = EarthWebGLDemo || {};

/**
 * Create an instance of earth, represents the ThreeJS model with meshes and materials.
 * You can load high or low quality textures with the query string "quality=high/low", ie: http://localhost:3000?quality=low
 * @return {object} earth model
 */
EarthWebGLDemo.earth = function() {

    const pathEarthModelLow = 'models/earth/low/earth.obj';
    const pathEarthModelHigh = 'models/earth/high/earth.obj';
    const pathEarthModelMaterialLow = 'models/earth/low/earth.mtl';
    const pathEarthModelMaterialHigh = 'models/earth/high/earth.mtl';

    /**
     * Represents the ThreeJS model of earth with meshes and materials.
     * @type {Object}
     */
    let earthObject = {

        /**
         * Are textures and materials loaded yet?
         * @type {Boolean}
         */
        isLoaded: false,

        /**
         * Texture and materials loading progress
         * @type {Number}
         */
        percentLoaded: 0,

        /**
         * Group containing the meshes that comprise atmosphere, clouds, terrain
         * @type {[type]}
         */
        meshGroup: null,

        /**
         * Mesh representing the atmosphere
         * @type {[type]}
         */
        atmosphereMesh: null,

        /**
         * Material on the atmosphere mesh
         * @type {[type]}
         */
        atmosphereMaterial: null,

        /**
         * Mesh representing the clouds
         * @type {[type]}
         */
        cloudsMesh: null,

        /**
         * Material on the clouds mesh
         * @type {[type]}
         */
        cloudsMaterial: null,

        /**
         * Mesh representing terrain
         * @type {[type]}
         */
        terrainMesh: null,

        /**
         * Material on the terrain mesh
         * @type {[type]}
         */
        terrainMaterial: null
    };

    /**
     * Load materials and textures, then map them to the object.
     * @param  {object} earthObject Target object to map.
     */
    function mapMaterialsTexturesToObject(earthObject) {

        let lowQuality = EarthWebGLDemo.urlParser.getQueryValueByKey('quality') === 'low';
        let earthPath, earthMaterialPath;

        if (lowQuality) {
            earthPath = pathEarthModelLow;
            earthMaterialPath = pathEarthModelMaterialLow;
        } else {
            earthPath = pathEarthModelHigh;
            earthMaterialPath = pathEarthModelMaterialHigh;
        }

        let loader = new THREE.OBJMTLLoader();
        loader.load(earthPath, earthMaterialPath, (o) => {
            
                //map imported object (OBJ) to our wrapper
                earthObject.meshGroup = o;
                earthObject.atmosphereMesh = o.children.find(child => child.name === 'Atmosphere_Sphere.002');
                earthObject.atmosphereMaterial = earthObject.atmosphereMesh.children[1].material;
                earthObject.cloudsMesh = o.children.find(child => child.name === 'Clouds_Sphere.001');
                earthObject.cloudsMaterial = earthObject.cloudsMesh.children[1].material;
                earthObject.terrainMesh = o.children.find(child => child.name === 'Earth_Sphere');
                earthObject.terrainMaterial = earthObject.terrainMesh.children[1].material;

                //make adjustments to the imported model that were lost in the import process
                earthObject.atmosphereMaterial.depthWrite = false;
                earthObject.cloudsMaterial.blending = THREE.AdditiveBlending;
                earthObject.cloudsMaterial.castShadow = true;
                earthObject.terrainMaterial.receiveShadow = true;

                //make sure the model isn't shiny otherwise it reflects light unrealistically
                earthObject.atmosphereMaterial.shininess = 0;
                earthObject.cloudsMaterial.shininess = 0;
                earthObject.terrainMaterial.shininess = 0;

                //flag model as loaded after all adjustments
                earthObject.isLoaded = true;
            },

            /**
             * Successful load
             * @param  {object} xhr XmlHttpRequest
             */
            (xhr) => {
                if (xhr.lengthComputable) {
                    earthObject.percentLoaded = xhr.loaded / xhr.total * 100;
                }
            },

            /**
             * Error loading earth materials and textures
             * @param  {object} xhr XmlHttpRequest
             */
            (xhr) => {
                console.error('Error loading earth materials and textures', xhr);
            });
    }

    mapMaterialsTexturesToObject(earthObject);
    return earthObject;
};