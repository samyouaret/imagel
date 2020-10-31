const UserRepository = require('../repositories/UserRepository');

class AuthController {
    constructor() {
        this.repository = new UserRepository();
    }

    login(req, res) {
        render('login', req, res);
    }

    register(req, res) {
        render('register', req, res);
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = AuthController;