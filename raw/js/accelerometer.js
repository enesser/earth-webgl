'use strict';

var EarthWebGLDemo = EarthWebGLDemo || {};

/**
 * Create an instance of the accelerometer function for accelerometer support in VR.
 * @param  {object} window object
 * @param  {object} document object
 * @param  {Function} callback
 */
EarthWebGLDemo.accelerometer = function(window, document, callback) {

    let ax = 0,
        ay = 0,
        x = 0,
        y = 0,
        vx = 0,
        vy = 0;

    if (callback) {
        if (window.DeviceMotionEvent) {
            window.ondevicemotion = function(e) {
                ax = event.accelerationIncludingGravity.x * 5;
                ay = event.accelerationIncludingGravity.y * 5;
            };
        }
        console.log('init acc');

        window.setInterval(() => {
            let landscapeOrientation = window.innerWidth / window.innerHeight > 1;

            if (landscapeOrientation) {
                vx = vx + ay;
                vy = vy + ax;
            } else {
                vy = vy - ay;
                vx = vx + ax;
            }
            vx = vx * 0.98;
            vy = vy * 0.98;

            y = parseInt(y + vy / 50);
            x = parseInt(x + vx / 50);

            if (x < 0) {
                x = 0;
                vx = -vx;
            }
            if (y < 0) {
                y = 0;
                vy = -vy;
            }
            if (x > document.documentElement.clientWidth - 20) {
                x = document.documentElement.clientWidth - 20;
                vx = -vx;
            }
            if (y > document.documentElement.clientHeight - 20) {
                y = document.documentElement.clientHeight - 20;
                vy = -vy;
            }
            callback(x, y);
        });
    }
};