module.exports = {
    actAs(user) {
        return (req, res, next) => {
            req.user = user;
            next()
        };
    },
    mountMiddleware(app, names) {
        if (app[name]){
            return app.use(app[name]);
        }
        throw new Error(`cannot mount ${name} which is ${app[name]} `);
    },
}