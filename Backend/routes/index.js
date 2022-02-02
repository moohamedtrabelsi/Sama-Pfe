var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
