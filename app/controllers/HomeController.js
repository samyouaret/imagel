const { env } = require('../../utils/pathHelper');
class HomeController {

    index(req, res) {
        render('index', req, res);
    }

    home(req, res) {
        render('home', req, res);
    }

}

module.exports = HomeController;