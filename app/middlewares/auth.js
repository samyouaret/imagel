const passport = require('passport');
const session = require('express-session');
const RegisterStrategy = require('./passport/RegisterStrategy');
const LoginStrategy = require('./passport/LoginStrategy');
const flash = require('connect-flash');

module.exports = function ({ express, env, sequelize }) {
    passport.use('local-login', LoginStrategy(sequelize));
    passport.use('local-signup', RegisterStrategy(sequelize));

    console.log('init auth.....');
    const router = express.Router();
    router.use(session({ secret: env('APP_KEY') }));
    router.use(express.urlencoded({ extended: false }));
    router.use(passport.initialize());
    router.use(passport.session());
    router.use(flash());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    return router;
}
