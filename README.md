Earth WebGL Demo
==========

*“Earth ‒ Where we keep all of our stuff.”*

This animated demo includes a photorealistic 3D earth and space scene, rendered in WebGL with three.js and served with Express 4.

![Screenshot](https://cloud.githubusercontent.com/assets/5659221/12347858/acb832ee-bb27-11e5-9cb4-eba3108fd405.png)

## Controls

![Screenshot](https://cloud.githubusercontent.com/assets/5659221/12347832/4ad257d0-bb27-11e5-93b1-fcc9bfba6fd6.png)

Setting                 | Description
------------------------| ----------------------------
**sunColor**            | Color of sunlight.
**sunIntensity**        | Intensity of the sunlight.
**ambientLight**        | Color of ambient light in the scene.
**atmosphereVisible**   | Toggle visiblity of the atmosphere.
**atmosphereColor**     | Color of the atmosphere.
**atmosphereOpacity**   | Opacity value of the atmosphere.
**atmosphereWireframe** | Toggle wireframe view on the atmosphere material.
**cloudsVisible**       | Toggle visibility of the cloud layer.
**cloudsOpacity**       | Opacity value of the cloud layer.
**cloudsWireframe**     | Toggle wireframe view of the cloud layer material.
**cloudsRotate**        | Toggle auto-rotation of the cloud layer.
**cloudsVelocity**      | Speed of cloud layer rotation. Negative value rotates backwards.
**terrainVisible**      | Toggle visibility of terrain.
**terrainBumpScale**    | Bump height of terrain bump mape. Can be negative for inset.
**terrainWireframe**    | Toggle wireframe view of terrain.
**terrainRotate**       | Toggle auto-rotation of terrain.
**terrainVelocity**     | Speed of terrain rotation. Negative value rotates backwards.

You can also control the camera position by dragging the mouse and holding the right or left mouse button.

## Launch Options

You can toggle quality modes using the ``quality`` query string (**high**/**low**):
```
http://localhost:3000?quality=low
```

UI can also be toggled using the ``ui`` query string (**true**/**false**):
```
http://localhost:3000?ui=false
```

## Installing

You’ll need [Node](https://nodejs.org/en/download/package-manager/) to get started.

```shell
$ git clone https://github.com/enesser/earth-webgl && cd earth-webgl
$ npm install -g gulp      # Install Gulp task runner
$ npm install              # Install requirements
$ npm start                # Run the demo
```

For development, you can run ``Gulp``:

```shell
$ npm install -g nodemon   # Install nodemon
$ gulp                     # Run the demo in development mode w/ nodemon
```

## Project Structure

```
|-- public/               # auto-generated client assets (via Gulp), do not edit
|-- raw/                  # source directory for client assets
|   |-- js/               # source JavaScript
|   |-- models/           # source models for high and low quality
|   |-- scss/             # source Sass
|
|-- routes/               # controllers for site pages
|-- views/                # handlebars templates for site pages
```

## Intro to 3D on the Web

I created this demo for an upcoming talk at [Designory](https://www.designory.com/): “Intro to 3D on the Web.”

Topics:

* 3D modeling in Blender
* UV mapping
* bump maps
* specular maps
* composite materials
* OBJ and three.js JSON exporting and importing
* three.js camera, scene, lighting, and mesh basics

If you’re interested in this talk, please let me know.

## Additional Credits

Special thanks:
* [Blender Guru](https://www.youtube.com/user/AndrewPPrice) for tips on creating a realistic 3D earth.
* [NASA](http://visibleearth.nasa.gov/view_cat.php?categoryID=0) for source material for the model textures.

## License
Copyright (c) 2014 Eric J Nesser, MIT

*Original source material for the model textures provided by NASA.*