const express = require('express');

module.exports = function (appInstance) {
    const router = express.Router();
    router.route('/api');
    return router;
}