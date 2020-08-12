module.exports = function (req, res, next) {
    if (req.user) {
        return next();
    }
    if(req.isApi){
        return res.status(422).send('Unauthorized');
    }
    res.redirect('/signin');
}
