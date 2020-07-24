const { DataTypes } = require('sequelize');
const Controller = require('./Controller');
const passport = require('passport');
const UserRepository = require('../repositories/UserRepository');

class UserController extends Controller {
    constructor(app) {
        super(app);
        this.repository = new UserRepository(app.sequelize, DataTypes);
    }

    login(req, res) {
        res.render('login', { appName: this.app.env('APP_NAME') });
    }

    authenticate(name) {
        return passport.authenticate(name, {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        });
    }

    register(req, res) {
        res.render('register', { appName: this.app.env('APP_NAME') });
    }

    logout(req, res) {
        req.logout();
        res.redirect('/');
    }
}

module.exports = UserController;