const pathHelper = require('./PathHelper');
const connection = require('../app/connection');
const { DataTypes } = require('sequelize');

module.exports = {
    createController(ClassName) {
        const controllerClass = require(pathHelper.controller_path(ClassName));
        return new controllerClass();
    },
    getModel(name) {
        return connection.models[name];
    }
}