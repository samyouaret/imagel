const UserRepository = require('../repositories/UserRepository');

class AuthController {
    constructor() {
        this.repository = new UserRepository();
    }

    login(req, res) {
        let message = withMessage(req);
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        res.render('login', {
            csrfToken, message
        });
    }

    register(req, res) {
        let message = withMessage(req);
        console.log("called in register");
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        res.render('register', {
            csrfToken, message
        });
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = AuthController;