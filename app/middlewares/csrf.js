const { env } = require('../../helpers/PathHelper');
module.exports = function (options = { cookie: true }) {
    if (env('APP_ENV') == 'test') {
        return (req, res, next) => next();
    }
    return require('csurf')(options);
}