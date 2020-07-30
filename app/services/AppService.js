const express = require('express');

module.exports = {
    start: function (appInstance) {
        let expressApp = appInstance.getApp();
        expressApp.set('view engine', appInstance.env('VIEW_ENGINE'));
        expressApp.set('views', appInstance.VIEWS_PATH);
        expressApp.use(express.static(appInstance.STATIC_PATH));
    }
}