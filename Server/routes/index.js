var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/panel', function(req, res, next) {
  res.render('pages/panel', { title: 'Express' });
});


router.post('/node-change', function(req, res, next) {
	console.log(req.body);
  res.redirect('/panel')
});

module.exports = router;
