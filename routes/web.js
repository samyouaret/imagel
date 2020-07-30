const authCheck = require('../app/middlewares/auth-check');
const express = require('express');

module.exports = function (appInstance) {
    const router = express.Router();
    let controller = appInstance.createController('HomeController');
    router.get('/', controller.index.bind(controller));
    router.get('/home', authCheck(appInstance), controller.home.bind(controller));

    return router;
}