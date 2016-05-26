var express = require('express');
var router = express.Router();

module.exports = function(passport){

    router.get('/', function (req, res, next) {
        res.render('index', { title: 'Express' });
    });

    router.get('/login', function (req, res, next) {
        res.render('login',{massage:req.flash('loginMessage')});
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect: '/admin/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    router.get('/register', function (req, res, next) {
        res.render('signup');
    });

    router.get('/logout', function (req, res, next) {
        req.logout();
        req.flash('loginMessage','You logout successfully');
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

