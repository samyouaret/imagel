module.exports = function (req, res, next) {
    if (req.user) {
        if (req.isApi) {
            return res.status(422).send('Unauthorized');
        }
        return res.redirect('back');
    }
    next();
}
