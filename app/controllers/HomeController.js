const Controller = require('./Controller');

class HomeController extends Controller {
    constructor(app) {
        super(app);
    }

    index(req, res) {
        res.render('index', { appName: this.app.env('APP_NAME') });
    }

    home(req, res) {
        res.render('home', { appName: this.app.env('APP_NAME') });
    }

}

module.exports = HomeController;