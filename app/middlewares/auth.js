const passport = require('passport');
const express = require('express');
const RegisterStrategy = require('./passport/RegisterStrategy');
const LoginStrategy = require('./passport/LoginStrategy');
const flash = require('connect-flash');
// const csrf = require('./csrf')


module.exports = function () {
    passport.use('local-login', LoginStrategy());
    passport.use('local-signup', RegisterStrategy());

    console.log('init auth.....');
    const router = express.Router();
    router.use(express.urlencoded({ extended: false }));
    router.use(passport.initialize());
    router.use(passport.session());
    // router.use(flash());
    // router.use(csrf());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    return router;
}
