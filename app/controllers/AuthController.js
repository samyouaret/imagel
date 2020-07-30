const Controller = require('./Controller');
const UserRepository = require('../repositories/UserRepository');

class AuthController extends Controller {
    constructor(app) {
        super(app);
        this.repository = new UserRepository(app.getConnection());
    }

    login(req, res) {
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        res.render('login', {
            csrfToken,
            appName: this.app.env('APP_NAME')
        });
    }

    register(req, res) {
        console.log(req.flash());
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        res.render('register', {
            csrfToken,
            appName: this.app.env('APP_NAME')
        });
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = AuthController;