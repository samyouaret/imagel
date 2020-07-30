const middleware = require('../app/middlewares/auth');
const guest = require('../app/middlewares/guest');
const { rules, validateWeb } = require('../validators/userValidator');
const passport = require('passport');

function authenticate(name) {
    return passport.authenticate(name, {
        successRedirect: '/home',
        failureRedirect: 'back',
        failureFlash: true
    });
}

module.exports = function (appInstance) {
    const router = middleware(appInstance);
    let AuthController = appInstance.createController('AuthController');
    let guestMiddleware = guest(appInstance);
    router.get('/register', guestMiddleware, AuthController.register.bind(AuthController));
    router.post('/register', guestMiddleware, rules(), validateWeb, authenticate('local-signup'));
    router.get('/login', guestMiddleware, AuthController.login.bind(AuthController));
    router.post('/login', guestMiddleware, authenticate('local-login'));
    router.post('/logout', AuthController.logout.bind(AuthController));

    return router;
}