const authCheck = require('../app/middlewares/auth-check');

module.exports = function (appObject) {
    const { express, createController } = appObject;
    const router = express.Router();
    let controller = createController('HomeController');
    router.use(authCheck(appObject));
    router.get('/', controller.index.bind(controller));
    router.get('/home', controller.home.bind(controller));

    return router;
}