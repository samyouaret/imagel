module.exports = {
    start: function (appObject) {
        const { app, env, route_path, wrap } = appObject;
        const webRouter = require(route_path('web'))(appObject);
        const apiRouter = require(route_path('api'))(appObject);
        app.use(webRouter);
        app.use(apiRouter);
        //custom 404 middleware handler
        app.use(function (req, res, next) {
            res.status(404).render('404', { appName: env('APP_NAME') });
        });

        // custom  middleware to handle server error
        app.use(function (err, req, res, next) {
            console.log(err.stack);
            res.status(500).send("<h3>Sorry internal error occured.<h3>")
        });
    }
}