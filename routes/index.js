'use strict';

require('babel-register');

const express = require('express'),
    router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Earth WebGL Demo'
    });
});

module.exports = router;