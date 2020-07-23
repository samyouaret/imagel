module.exports = {
    start: function ({ app, express, APP_PORT, env, STATIC_PATH, VIEWS_PATH }) {
        app.set('view engine', env('VIEW_ENGINE'));
        app.set('views', VIEWS_PATH);
        app.use(express.static(STATIC_PATH));
        app.listen(APP_PORT, function () {
            console.log(`server listening at http://localhost:${APP_PORT}`)
        });
    }
}