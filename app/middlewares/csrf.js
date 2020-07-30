module.exports = function (appInstance) {
    if (appInstance.env('APP_ENV') == 'test') {
        return (req, res, next) => next();
    }
    return require('csurf')({ cookie: true });
}