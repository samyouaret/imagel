const pathHelper = require('../utils/pathHelper');
const express = require('express');
const fs = require('fs');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const isApi = require('./middlewares/isApiRequest');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

class Application {
    constructor() {
        this.app = express();
        this.pathHelper = pathHelper;
        this.env = pathHelper.env;
        this.APP_PORT = pathHelper.env('port') || pathHelper.env('APP_PORT') || 8080;
        if (pathHelper.env('NODE_ENV')) {
            pathHelper.env('APP_ENV', pathHelper.env('NODE_ENV'));
        } else {
            pathHelper.env('NODE_ENV', this.APP_ENV);
        }
        this.APP_ENV = pathHelper.env('APP_ENV');
        this.VIEWS_PATH = pathHelper.root_path(pathHelper.env('VIEWS_PATH')) || pathHelper.view_path();
        this.STATIC_PATH = pathHelper.root_path(pathHelper.env('STATIC_PATH')) || pathHelper.static_path();
    }

    getServer() {
        return this.app;
    }

    start() {
        this.init();
        this.startServer();
    }

    init() {
        global.env = pathHelper.env;
        global.view = pathHelper.view;
        global.withMessage = (req) => {
            let message = { errors: [], success: [] };
            // you need to consume it with req.flash
            // otherwise it persists
            if (req.session.flash) {
                message.errors = req.flash('error');
                message.success = req.flash('success');
            }
            return message;
        };
        global.render = (file, req, res, data = null) => {
            const csrfToken = req.csrfToken ? req.csrfToken() : '';
            let message = withMessage(req);
            let isAuthenticated = req.isAuthenticated();
            let user = req.user;
            res.render(file, {
                csrfToken, message, user, isAuthenticated, ...data
            });
        }
        this.app.set('view engine', this.env('VIEW_ENGINE'));
        this.app.set('views', this.VIEWS_PATH);
        this.app.use(isApi);
        // create a write stream (in append mode)
        var accessLogStream = fs.createWriteStream(pathHelper.static_path('storage/logs/access.log'), { flags: 'a' })
        // setup the logger
        this.app.use(morgan('combined', { stream: accessLogStream }))

        this.app.use(express.static(this.STATIC_PATH));
        this.app.use(cookieParser(this.env('APP_KEY')));
        this.app.use(express.urlencoded({ extended: false }));
        // to use put,delete coming form html forms
        this.app.use(methodOverride("_method"));
        this.app.use(session({
            secret: this.env('APP_KEY'),
            resave: true,
            saveUninitialized: true,
        }));
        this.app.use(flash());
        this.loadRoutes(() => {
            // custom 404 middleware handler
            this.app.use((req, res, next) => {
                res.status(404).render('404');
            });

            // custom  middleware to handle server error
            this.app.use((err, req, res, next) => {
                console.log(err.stack);
                res.status(500).send("<h3>Sorry internal error occured.<h3>")
            });
        }, { only: ['web'] });
    }

    loadRoutes(callback, options = { only: null }) {

        const routesPath = pathHelper.route_path();
        fs.readdir(routesPath, (err, files) => {
            files.forEach(file => {
                if (options.only && options.only.includes(file.replace('.js', ''))) {
                    let router = require(pathHelper.route_path(file));
                    this.app.use(router);
                }
            });
            callback();
        });
    }

    startServer() {
        this.app.listen(this.APP_PORT, () => {
            console.log(`server listening at http://localhost:${this.APP_PORT}`)
        });
    }

}

module.exports = Application;