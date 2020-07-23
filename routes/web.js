module.exports = function (appObject) {
    const router = appObject.express.Router();

    let controller = appObject.createController('HomeController');
    router.get('/', controller.index.bind(controller));
    
    return router;
}