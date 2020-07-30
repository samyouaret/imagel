const passport = require('passport');
const session = require('express-session');
const express = require('express');
const RegisterStrategy = require('./passport/RegisterStrategy');
const LoginStrategy = require('./passport/LoginStrategy');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const csrf = require('./csrf')

module.exports = function (appInstance) {
    passport.use('local-login', LoginStrategy(appInstance.getConnection()));
    passport.use('local-signup', RegisterStrategy(appInstance.getConnection()));

    console.log('init auth.....');
    const router = express.Router();
    router.use(session({
        secret: appInstance.env('APP_KEY'),
        resave: true,
        saveUninitialized: true,
        /*cookie: {
            maxAge: (1000 * 60 * 100)
        }*/
    }));
    router.use(express.urlencoded({ extended: false }));
    router.use(cookieParser(appInstance.env('APP_KEY')));
    router.use(passport.initialize());
    router.use(passport.session());
    router.use(flash());
    // router.use(csrf(appInstance));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    return router;
}
