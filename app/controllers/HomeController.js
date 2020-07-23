const { DataTypes } = require('sequelize');
const Controller = require('./Controller');
const userInitializer = require('../models/user');

class HomeController extends Controller {
    constructor(app) {
        super(app);
        this.User = userInitializer(app.sequelize, DataTypes);
    }

     index(req, res) {
        // const user = await this.User.create({
        //     firstName: "Adam",
        //     lastName: 'James',
        //     email: 'James@mail.com',
        // });
        // console.log(user);
        res.render('index', { appName: this.app.env('APP_NAME') });
    }
}

module.exports = HomeController;