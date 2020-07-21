
class HomeController {
    index(req, res) {
        res.render('index', { appName: process.env.APP_NAME });
    }
}

module.exports = new HomeController;