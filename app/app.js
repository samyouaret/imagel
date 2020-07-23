const { env, root_path, view_path, controller_path, route_path, config_path } = require('../helpers/PathHelper');
const express = require('express');
const app = express();
const APP_PORT = env('APP_PORT') || 8080;
const VIEWS_PATH = root_path(env('VIEWS_PATH')) || view_path('');
const STATIC_PATH = root_path(env('STATIC_PATH')) || static_path('');
const { services } = require(config_path('services'));
const { Sequelize, DataTypes } = require('sequelize');
// const loadModels = require('../helpers/loadModels');

const sequelize = new Sequelize(
    env('DB_DATABASE'),
    env('DB_USERNAME'),
    env('DB_PASSWORD'),
    {
        host: env('DB_HOST'),
        dialect: env('DB_CONNECTION')
    });

const appObject = {
    app,
    env,
    root_path,
    view_path,
    route_path,
    controller_path,
    express,
    APP_PORT,
    VIEWS_PATH,
    STATIC_PATH,
    sequelize
};

appObject.createController = function createController(ClassName) {
    const controllerClass = require(controller_path(ClassName));
    return new controllerClass(appObject);
};

module.exports = {
    start: function () {
        services.forEach(service => {
            require(service).start(appObject);
        });
        // loadModels(sequelize, DataTypes);
    }
}