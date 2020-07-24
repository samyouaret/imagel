const middleware = require('../app/middlewares/auth');
const guest = require('../app/middlewares/guest');

module.exports = function (appObject) {
    const { express, env, sequelize, createController } = appObject;
    const router = middleware({ express, env, sequelize });
    let UserController = createController('UserController');
    let guestMiddleware = guest(appObject);
    router.get('/register', guestMiddleware, UserController.register.bind(UserController));
    router.post('/register', guestMiddleware, UserController.authenticate('local-signup'));
    router.get('/login', guestMiddleware, UserController.login.bind(UserController));
    //this should be done by middleware
    //consider moveauthenticate func to middleware
    router.post('/login', guestMiddleware, UserController.authenticate('local-login'));
    router.post('/logout', UserController.logout.bind(UserController));

    return router;
}