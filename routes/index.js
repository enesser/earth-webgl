'use strict';

require('babel-register');

const express = require('express'),
    router = express.Router(),
    projectSettings = require('../package.json');

/* GET home page. */

router.get('/', (req, res) => {
    console.dir(projectSettings);
    res.render('index', {
        title: 'Earth WebGL Demo',
        description: projectSettings.description,
        homepage: projectSettings.homepage
    });
});

module.exports = router;