'use strict';

/* global dat: true */

var EarthWebGLDemo = EarthWebGLDemo || {};

/**
 * Create an instance of configurable settings for the demo.
 * You can allow or disallow a GUI for these settings with the query string "ui=true/false", ie: http://localhost:3000?ui=false
 * @return {object} Scene settings
 */
EarthWebGLDemo.settings = function() {

    /**
     * Default sun color
     * @type {String}
     */
    const sunColor = '#ffeedd',

        /**
         * Default sun intensity
         * @type {Number}
         */
        sunIntensity = 3.4,

        /**
         * Default ambient light color
         * @type {String}
         */
        ambientLight = '#555555',

        /**
         * Atmosphere is visible?
         * @type {Boolean}
         */
        atmsophereVisible = true,

        /**
         * Atmosphere color
         * @type {String}
         */
        atmosphereColor = '#001ea3',

        /**
         * Atmosphere opacity
         * @type {Number}
         */
        atmopshereOpacity = 0.22,

        /**
         * Show atmosphere wireframe
         * @type {Boolean}
         */
        atmosphereWireframe = false,

        /**
         * Clouds are visible?
         * @type {Boolean}
         */
        cloudsVisible = true,

        /**
         * Clouds opacity
         * @type {Number}
         */
        cloudsOpacity = 0.9,

        /**
         * Show clouds wireframe
         * @type {Boolean}
         */
        cloudsWireframe = false,

        /**
         * Auto-rotate clouds around the planet?
         * @type {Boolean}
         */
        cloudsRotate = true,

        /**
         * Speed of automatic cloud rotation (can be negative for backwards)
         * @type {Number}
         */
        cloudsVelocity = 0.002,

        /**
         * Terrain is visible?
         * @type {Boolean}
         */
        terrainVisible = true,

        /**
         * Terrain bump height scale (altitude of bump map, can be negative for inset)
         * @type {Number}
         */
        terrainBumpScale = 0.04,

        /**
         * Show terrain wireframe
         * @type {Boolean}
         */
        terrainWireframe = false,

        /**
         * Auto-rotate terrain?
         * @type {Boolean}
         */
        terrainRotate = true,

        /**
         * Speed of automatic terrain rotation (can be negative for backwards)
         * @type {Number}
         */
        terrainVelocity = 0.001,

        /**
         * Project URL
         * @type {String}
         */
        homepage = 'https://github.com/enesser/earth-webgl';

    let showUi = EarthWebGLDemo.urlParser.getQueryValueByKey('ui') !== 'false' &&
        EarthWebGLDemo.urlParser.getQueryValueByKey('vr') !== 'true';

    let gui = null;

    if (showUi) {
        gui = new dat.GUI({
            width: 360
        });
        gui.close();
    }

    /**
     * Settings schema business object
     * @type {Object}
     */
    let settingsSchema = {
        /**
         * Reset settings to default
         */
        reset: function() {
            this.sunColor = sunColor;
            this.sunIntensity = sunIntensity;
            this.ambientLight = ambientLight;
            this.atmosphereVisible = atmsophereVisible;
            this.atmosphereColor = atmosphereColor;
            this.atmosphereOpacity = atmopshereOpacity;
            this.atmosphereWireframe = atmosphereWireframe;
            this.cloudsVisible = cloudsVisible;
            this.cloudsOpacity = cloudsOpacity;
            this.cloudsWireframe = cloudsWireframe;
            this.cloudsRotate = cloudsRotate;
            this.cloudsVelocity = cloudsVelocity;
            this.terrainVisible = terrainVisible;
            this.terrainBumpScale = terrainBumpScale;
            this.terrainWireframe = terrainWireframe;
            this.terrainRotate = terrainRotate;
            this.terrainVelocity = terrainVelocity;

            if (showUi) {
                for (let folder in gui.__folders) {
                    for (let i in gui.__folders[folder].__controllers) {
                        gui.__folders[folder].__controllers[i].updateDisplay();
                    }
                }
            }
        },

        /**
         * Go to home page
         */
        homepage: function() {
            window.open(homepage, '_blank');
        }
    };

    /**
     * Bind settings schema object to dat.gui interface.
     * @param  {object} settingsSchema
     */
    function bindSettingsSchemaToUi(settingsSchema) {
        let sunFolder = gui.addFolder('Sun');
        sunFolder.addColor(settingsSchema, 'sunColor');
        sunFolder.add(settingsSchema, 'sunIntensity').min(-10).max(50);
        sunFolder.addColor(settingsSchema, 'ambientLight');

        let atmosphereFolder = gui.addFolder('Atmosphere');
        atmosphereFolder.add(settingsSchema, 'atmosphereVisible');
        atmosphereFolder.addColor(settingsSchema, 'atmosphereColor');
        atmosphereFolder.add(settingsSchema, 'atmosphereOpacity').min(0).max(1);
        atmosphereFolder.add(settingsSchema, 'atmosphereWireframe');

        let cloudsFolder = gui.addFolder('Clouds');
        cloudsFolder.add(settingsSchema, 'cloudsVisible');
        cloudsFolder.add(settingsSchema, 'cloudsOpacity').min(0).max(1);
        cloudsFolder.add(settingsSchema, 'cloudsWireframe');
        cloudsFolder.add(settingsSchema, 'cloudsRotate');
        cloudsFolder.add(settingsSchema, 'cloudsVelocity').min(-0.01).max(0.01);

        let terrainFolder = gui.addFolder('Terrain');
        terrainFolder.add(settingsSchema, 'terrainVisible');
        terrainFolder.add(settingsSchema, 'terrainBumpScale').min(-10).max(10);
        terrainFolder.add(settingsSchema, 'terrainWireframe');
        terrainFolder.add(settingsSchema, 'terrainRotate');
        terrainFolder.add(settingsSchema, 'terrainVelocity').min(-0.01).max(0.01);

        gui.add(settingsSchema, 'reset');
        gui.add(settingsSchema, 'homepage');
    }

    settingsSchema.reset();

    if (showUi) {
        bindSettingsSchemaToUi(settingsSchema);
    }

    return settingsSchema;
};