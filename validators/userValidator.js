const { body } = require('express-validator');

module.exports = {
    rules() {
        return [
            // username must be an email
            body('email').isEmail()
                .normalizeEmail()
                .withMessage('invalid email given')
            ,
            body('firstname')
                .notEmpty()
                .withMessage('first name cannot be empty')
            ,
            body('lastname')
                .notEmpty()
                .withMessage('last name cannot be empty')
            ,
            body('password').isLength({ min: 8 })
                .withMessage('password length should be at least 8.')
                .bail()
                .isAlphanumeric().withMessage('password should only contain characters and numbers.')
            ,
        ]
    }
}