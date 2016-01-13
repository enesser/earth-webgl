'use strict';

require('babel-register');

let express = require('express');
let router = express.Router();

/* GET home page. */

router.get('/', (req, res) => {
  res.render('index', { title: 'Earth WebGL Demo' });
});

module.exports = router;