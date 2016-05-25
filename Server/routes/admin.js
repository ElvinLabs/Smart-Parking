var express = require('express');
var router = express.Router();
var User = require('../models/user/userModel');

router.get('/', function(req, res, next) {
  res.header(200);
  res.render('pages/home');
});

router.get('/places', function(req, res, next) {
  res.header(200);
  res.render('pages/addPlace');
});

router.get('/nodes', function(req, res, next) {
  res.header(200);
  res.render('pages/nodes');
});

module.exports = router;
