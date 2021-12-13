const { body } = require('express-validator');

module.exports = {
    rules() {
        return [
            body('title').notEmpty()
                .withMessage('title cannot be empty')
                .isLength({ max: 100 })
                .withMessage('title length cannot greater than 100 letters')
            ,
            body('description')
                .notEmpty()
                .withMessage('description cannot be empty')
                .isLength({ max: 1000 })
                .withMessage('description length cannot greater than 1000 letters'),
        ]
    }
}