const passport = require('passport');
const session = require('express-session');

module.exports = function (appInstance) {
    let app = appInstance.getApp();
    app.use(session({
        secret: appInstance.env('APP_KEY'),
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    return function (req, res, next) {
        if (req.user) {
            return res.redirect('back');
        }
        console.log('pass guest');
        next();
    }
}