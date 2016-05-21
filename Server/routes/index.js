var express = require('express');
var router = express.Router();
//var preProcess = require('../common/nodePreProcess');
//var nodeProcess = new preProcess();

module.exports = function(passport){

    /* GET home page. */

    router.get('/',isLoggedIn, function (req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.post('/abc', function (req, res, next) {
        console.log(req.body);
        res.header(200);
        //res.render('index', { title: 'Express' });
        res.send({'msg':'Hello'})
    });

    router.get('/login', function (req, res, next) {
        res.render('login');
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/api/nodes', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    router.get('/register', function (req, res, next) {
        res.render('signup');
    });

    router.get('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/login');
    });

    router.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/api/nodes', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    function isLoggedIn(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/login');
        }
    }


    return router;

};

