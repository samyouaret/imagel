module.exports = function (appInstance) {
    const router = appInstance.express.Router();
    router.route('/api');
    return router;
}