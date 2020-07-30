const { body, validationResult } = require('express-validator');

module.exports = {
    rules() {
        return [
            // username must be an email
            body('email').isEmail()
                .normalizeEmail(),
            body('firstname').notEmpty(),
            body('lastname').notEmpty(),
            // password must be at least 5 chars long
            body('password').isLength({ min: 8 })
                .isAlphanumeric(),
        ]
    },
    validateWeb(req, res, next) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            console.log('pass validate web');
            return next()
        }
        errors.array().forEach(error => {
            // console.log(error);
            req.flash(error.param, error.msg);
        })
        return res.redirect('back');
    },
    validateApi(req, res, next) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        return res.status(422).json({ errors })
    },
}