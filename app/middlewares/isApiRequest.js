module.exports = function (req, res, next) {
    req.isApi = false;
    // let accepts = ['application/json', 'application/xml'];
    if (req.xhr ||
        req.headers.accept.includes('application/json') ||
        req.headers.accept.includes('*/*') ||
        req.headers.accept.includes('application/xml')) {
        req.isApi = true;
    }
    next();
}
