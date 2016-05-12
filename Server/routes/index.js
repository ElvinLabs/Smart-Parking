var express = require('express');
var router = express.Router();
var preProcess = require('../common/nodePreProcess');
var nodeProcess = new preProcess();


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

module.exports = router;
