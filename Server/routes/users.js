var express = require('express');
var router = express.Router();
var User = require('../models/user/userModel');

router.get('/', function(req, res, next) {
  res.send('respond with a resource.');
});

module.exports = router;


//var user = new User({fName:"aja",lName:"chana",email:"aghjk",created: new Date()});
//console.log(user);