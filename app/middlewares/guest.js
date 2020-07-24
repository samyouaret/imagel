const passport = require('passport');
const session = require('express-session');

module.exports = function ({ app, env }) {
    app.use(session({ secret: env('APP_KEY') }));
    app.use(passport.initialize());
    app.use(passport.session());
    return function (req, res, next) {
        if (req.user) {
            return res.redirect('back');
        }
        next();
    }
}