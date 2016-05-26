var express = require('express');
var router = express.Router();
var User = require('../models/user/userModel');

router.get('/',isLoggedIn, function(req, res, next) {
  res.header(200);
  res.render('pages/home');
});

router.get('/places',isLoggedIn, function(req, res, next) {
  res.header(200);
  res.render('pages/places',{user:req.user});
});

router.get('/nodes',isLoggedIn, function(req, res, next) {
  res.header(200);
  res.render('pages/nodes',{user:req.user});
});

router.get('/nodeTest',isLoggedIn,function(req, res, next) {
  console.log(req.user);
  res.header(200);
  res.render('pages/nodeTest',{user:req.user});
});

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;
