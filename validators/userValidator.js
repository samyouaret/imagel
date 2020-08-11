const { body, validationResult } = require('express-validator');

module.exports = {
    rules() {
        return [
            // username must be an email
            body('email').isEmail()
                .normalizeEmail().withMessage('invalid email given'),
            body('firstname').notEmpty().withMessage('firstname cannot be empty'),
            body('lastname').notEmpty().withMessage('lastname cannot be empty'),
            // password must be at least 5 chars long
            body('password').isLength({ min: 8 }).isAlphanumeric()
                .withMessage('password should contains characters and numbers, length should be atleast 8.'),
        ]
    },
    validateWeb(req, res, next) {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const formattedErrors = [];
        errors.array().map(err => formattedErrors.push(err.msg))
        req.flash('message', { errors: formattedErrors });
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