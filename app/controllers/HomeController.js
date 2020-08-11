const { env } = require('../../helpers/PathHelper');
class HomeController {

    index(req, res) {
        res.render('index', {});
    }

    home(req, res) {
        const csrfToken = req.csrfToken ? req.csrfToken() : '';
        res.render('home', {
            csrfToken
        });
    }

}

module.exports = HomeController;