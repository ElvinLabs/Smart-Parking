/**
 * Created by ajantha on 5/12/16.
 */


var LocalStrategy   = require('passport-local').Strategy;
var User            = require('../models/user/userModel');


// expose this function to our app using module.exports
module.exports = function(passport) {

    console.log("-----------------------------------");

    passport.serializeUser(function(user, done) {
        console.log("----------------serializeUser-------------------");
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("----------------deserializeUser-------------------")
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            console.log("************************************");
            process.nextTick(function() {
                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({ 'local.username' :  username }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser  = new User();
                        // set the user's local credentials
                        newUser.local.username    = username;
                        newUser.local.password = newUser.generateHash(password);
                        // save the user
                        newUser.save(function(err) {
                            if (err) console.log(err);
                            else console.log(" new user added");

                            return done(null, newUser);
                        });
                    }

                });

            });

        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.username' :  username }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);
                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                // all is well, return successful user
                return done(null, user);
            });

        }));

};