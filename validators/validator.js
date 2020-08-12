const { validationResult } = require('express-validator');

module.exports = function validate(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next()
    }
    const formattedErrors = [];
    errors.array().map(err => formattedErrors.push(err.msg))
    if (req.isApi) {
        return res.status(422).json({ errors: formattedErrors })
    }
    req.flash('error', formattedErrors);
    return res.redirect('back');
}