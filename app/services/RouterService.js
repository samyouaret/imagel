module.exports = {
    start: function (appInstance) {
        let app = appInstance.getApp();
        const webRouter = require(appInstance.pathHelper.route_path('web'))(appInstance);
        const apiRouter = require(appInstance.pathHelper.route_path('api'))(appInstance);
        app.use(webRouter);
        app.use(apiRouter);
        //custom 404 middleware handler
        app.use(function (req, res, next) {
            res.status(404).render('404', { appName: appInstance.env('APP_NAME') });
        });

        // custom  middleware to handle server error
        app.use(function (err, req, res, next) {
            console.log(err.stack);
            res.status(500).send("<h3>Sorry internal error occured.<h3>")
        });
    }
}