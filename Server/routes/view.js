/**
 * Created by ajantha on 5/22/16.
 */
var express = require('express');
var router = express.Router();

//router.all('/*', function(req,res){
//    var name = req.params.name;
//    res.sendfile('pages/'+name+'.ejs');
//});

// GET the Admin Home page
module.exports = function(){


    router.get('/',isLoggedIn, function(req,res){
        res.header(200);
        res.render('pages/home');
    });

    // GET the Admin Home page
    router.get('/addplace',isLoggedIn, function(req,res){
        res.header(200);
        res.render('pages/addplace');
    });

    function isLoggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };

  return router;

};