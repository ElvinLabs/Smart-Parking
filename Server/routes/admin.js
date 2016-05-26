var express = require('express');
var router = express.Router();
var User = require('../models/user/userModel');

router.get('/', function(req, res, next) {
  res.header(200);
  res.render('pages/home');
});

router.get('/places', function(req, res, next) {
  res.header(200);
  res.render('pages/places');
});

router.get('/nodes', function(req, res, next) {
  res.header(200);
  res.render('pages/nodes');
});




//function isLoggedIn(req, res, next) {
//  if (req.user) {
//    next();
//  } else {
//    res.redirect('/login');
//  }
//}



module.exports = router;
