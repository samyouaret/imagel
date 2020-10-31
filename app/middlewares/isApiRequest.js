module.exports = function (req, res, next) {
    req.isApi = false;
    if (req.xhr ||
        req.headers.accept == 'application/json' ||
        req.headers['content-type'] == 'application/json' ||
        req.headers.accept == 'application/xml') {
        req.isApi = true;
    }
    next();
}
