const pathHelper = require('../helpers/PathHelper');
const express = require('express');
const { DataTypes } = require('sequelize');
const { services } = require(pathHelper.config_path('services'));
const fs = require('fs');
const path = require('path');

class Application {
    constructor() {
        this.connection = null;
        this.app = express();
        this.pathHelper = pathHelper;
        this.env = pathHelper.env;
        this.APP_PORT = pathHelper.env('APP_PORT') || 8080;
        if (pathHelper.env('NODE_ENV')) {
            pathHelper.env('APP_ENV', pathHelper.env('NODE_ENV'));
        } else {
            pathHelper.env('NODE_ENV', this.APP_ENV);
        }
        this.APP_ENV = pathHelper.env('APP_ENV');
        this.models = {};
        this.VIEWS_PATH = pathHelper.root_path(pathHelper.env('VIEWS_PATH')) || pathHelper.view_path('');
        this.STATIC_PATH = pathHelper.root_path(pathHelper.env('STATIC_PATH')) || pathHelper.static_path('');
    }

    loadModels() {
        const modelsPath = pathHelper.model_path('');
        fs.readdir(modelsPath, (err, files) => {
            let models = {};
            files.forEach(file => {
                let modelName = path.basename(file).split('.')[0];
                models[modelName] =
                    require(pathHelper.model_path(file))
                        (this.connection, DataTypes);
            });
            this.models = models;
        });
    }

    getConnection() {
        return this.connection;
    }

    createController(ClassName) {
        const controllerClass = require(this.pathHelper.controller_path(ClassName));
        return new controllerClass(this);
    }

    getApp() {
        return this.app;
    }

    start() {
        this.loadServices();
        this.loadModels();
        this.startServer();
    }

    loadServices() {
        services.forEach(service => {
            require(service).start(this);
        });
    }

    startServer() {
        this.app.listen(this.APP_PORT, () => {
            console.log(`server listening at http://localhost:${this.APP_PORT}`)
        });
    }

}

module.exports = Application;