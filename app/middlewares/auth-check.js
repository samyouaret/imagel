const passport = require('passport');
const session = require('express-session');

module.exports = function (appInstance) {
    let expressApp = appInstance.getApp();
    expressApp.use(session({
        secret: appInstance.env('APP_KEY'),
        resave: true,
        saveUninitialized: true,
    }));
    expressApp.use(passport.initialize());
    expressApp.use(passport.session());
    return function (req, res, next) {
        if (req.user) {
            console.log('pass auth-check');
            return next();
        }
        console.log('did not pass auth-check');
        res.redirect('/login');
    }
}
